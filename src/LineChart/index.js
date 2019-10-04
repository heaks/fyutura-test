import React from 'react';
import _ from 'lodash';
import Component from './Component';
import PropTypes from 'prop-types';

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

export const timeScaling = divider =>
  _.range(0, 1300, 100).map(e => ({
    x: e,
    second: e / (1000 / divider),
  }));

const Wrapper = ({ graphData }) => {
  const scaleDivider = getScale(graphData);
  const lines = generateLines(graphData, scaleDivider);
  const secondsScale = timeScaling(scaleDivider);
  return (
    <Component lines={lines} secondsScale={secondsScale}/>
  )
};

Wrapper.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default Wrapper;