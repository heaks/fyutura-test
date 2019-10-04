import React from 'react';
import _ from 'lodash';
import Component from './Component';
import PropTypes from 'prop-types';

export const groupRanges = (data) => {
  const onlyValues = data.map(data => data.value);
  return _.groupBy(onlyValues, (value) => (Math.floor(value / 10) * 10).toString());
};

const Wrapper = ({ graphData }) => {
  const groups = groupRanges(graphData);
  return (
    <Component groups={groups}/>
  )
};

Wrapper.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default Wrapper;