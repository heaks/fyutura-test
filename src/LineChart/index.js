import React from 'react';
import Component from './Component';
import PropTypes from 'prop-types';


const mockData = [
  { value: -73.3471584187495, timestamp: 1570191003405 },
  { value: 92.4158657302873, timestamp: 1570191009549 },
  { value: 53.933803680902, timestamp: 1570191016939 },
  { value: 62.728641927398684, timestamp: 1570191022236},
];

export const generateLines = (data, divider) => {
  if(!data.length) return [];
  const beginningStamp = data[0].timestamp;
  return data.reduce((acc, curr, idx, src) => {
    const nextPoint = src[idx + 1];
    if(!nextPoint) return acc;
    const yCoord1 = (100 - curr.value) * 2.5;
    const yCoord2 = (100 - nextPoint.value) * 2.5;
    const xCoord1 = (curr.timestamp - beginningStamp) / divider;
    const xCoord2 = (nextPoint.timestamp - beginningStamp) / divider;
    const line = {
      y1: yCoord1,
      y2: yCoord2,
      x1: xCoord1,
      x2: xCoord2,
    };
    acc.push(line);
    return acc;
  }, []);
};

// primitive scaling
export const getScale = graphData => {
  const TIME_THRESHOLD = 100000;
  const DEFAULT_DIVIDER = 100;
  if (!graphData.length) {
    return DEFAULT_DIVIDER;
  };
  const timeElapsed = graphData[graphData.length -1].timestamp - graphData[0].timestamp;
  if (timeElapsed > TIME_THRESHOLD * 5) {
    return DEFAULT_DIVIDER * 25;
  }
  if (timeElapsed > TIME_THRESHOLD) {
    return DEFAULT_DIVIDER * 5
  }
  return DEFAULT_DIVIDER;
};

const Wrapper = ({ graphData }) => {
  const scaleDivider = getScale(graphData);
  const lines = generateLines(graphData, scaleDivider);
  return (
    <Component lines={lines}/>
  )
};

Wrapper.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default Wrapper;