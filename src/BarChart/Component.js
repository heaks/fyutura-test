import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import ENUM from './ENUM';
import styles from '../styles';

const BarChart = ({ groups }) => (
  <div>
    <p style={styles.title}>Range Categories</p>
    <svg height={700} width={1200}>
      {Object.keys(ENUM.RANGE_NAMES)
        .sort((a, b) => Number(b) - Number(a))
        .map((key, index) => {
          return (
            <g key={key}>
              <defs>
                <linearGradient id="lg1">
                  <stop offset="0%" stopColor={'lightgreen'} />
                  <stop offset="100%" stopColor={'green'} />
                </linearGradient>
              </defs>
              <text
                x={0}
                y={index * ENUM.LINE_DISTANCE + 10}
                fontSize={12}
              >
                {ENUM.RANGE_NAMES[key]}
              </text>
              <rect
                x={ENUM.LEFT_PADDING}
                y={index * ENUM.LINE_DISTANCE}
                width={ENUM.STEP_WIDTH * _.get(groups, [key, 'length'], 0) || 3}
                height={10}
                fill="url(#lg1)"
                style={{
                  strokeWidth: 2,
                  stroke: 'grey',
                }}
              />
            </g>
          );
        }
      )}
      {
        _.range(0, 36, 1).map((i) => (
          <text
            key={i}
            x={ENUM.LEFT_PADDING + i * ENUM.STEP_WIDTH}
            y={620}
            fontSize={12}
          >
            {i}
          </text>
        ))
      }
      <line
        x1={ENUM.LEFT_PADDING}
        y1={600}
        x2={1200 + ENUM.LEFT_PADDING}
        y2={600}
        stroke={'rgb(55, 55, 55, 0.5)'}
        strokeWidth={2}
      />
      <line
        x1={ENUM.LEFT_PADDING}
        y1={0}
        x2={ENUM.LEFT_PADDING}
        y2={600}
        stroke={'rgb(55, 55, 55, 0.5)'}
        strokeWidth={2}
      />
    </svg>
  </div>
);

BarChart.propTypes = {
  groups: PropTypes.shape().isRequired,
};

export default BarChart;
