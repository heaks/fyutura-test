import React from 'react';
import PropTypes from 'prop-types';

import ENUM from './ENUM';
import styles from '../styles';

const LineChart = ({ lines, secondsScale }) => (
  <div>
    <p style={styles.title}>Changes Over Time</p>
    <svg
      width={1300}
      height={600}
    >
      <line
        x1={ENUM.PADDING}
        y1={ENUM.TOP_PADDING}
        x2={ENUM.PADDING}
        y2={ENUM.TOP_PADDING + 500}
        style={{
          stroke: 'rgb(55, 55, 55, 0.7)',
          strokeWidth: 2,
        }}
      />
      <line
        x1={ENUM.PADDING}
        y1={ENUM.TOP_PADDING + 500}
        x2={ENUM.PADDING + 1200}
        y2={ENUM.TOP_PADDING + 500}
        style={{
          stroke: 'rgb(55, 55, 55, 0.7)',
          strokeWidth: 2,
        }}
      />
      <line
        x1={ENUM.PADDING}
        y1={ENUM.TOP_PADDING + 250}
        x2={ENUM.PADDING + 1200}
        y2={ENUM.TOP_PADDING + 250}
        stroke={'rgb(55, 55, 55, 0.5)'}
        strokeDasharray={2}
        strokeWidth={1}
      />
      {lines.map(({x1, x2, y1, y2}, index) => (
        <line
          key={index}
          x1={x1 + ENUM.PADDING}
          y1={y1 + ENUM.TOP_PADDING}
          x2={x2 + ENUM.PADDING}
          y2={y2 + ENUM.TOP_PADDING}
          style={{
            stroke: 'rgb(0, 55, 0, 0.7)',
            strokeWidth: 2,
          }}
        />
      ))}
      {
        ENUM.LINE_SCALE.map((e, i) => (
          <text
            key={i}
            x={ENUM.LEFT_PADDING}
            y={(i * 62.5) + ENUM.TOP_PADDING}
            style={styles.scale}
          >
            {e}
          </text>
        ))
      }
      {
        secondsScale.map((e, i) => (
          <text
            key={i}
            x={ENUM.PADDING + e.x}
            y={570}
            style={styles.scale}
          >
            {`${e.second}s`}
          </text>
        ))
      }
    </svg>
  </div>
);

LineChart.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired,
  })).isRequired,
  secondsScale: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      second: PropTypes.number.isRequired,
    }),
  ),
};

export default LineChart;