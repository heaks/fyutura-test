import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles';

const Controller = ({ threshold, setThreshold }) => (
  <div>
    <p style={styles.title}>Threshold</p>
    <input
      type='number'
      min={-100}
      max={100}
      value={threshold}
      onChange={event => {
        setThreshold(event.target.value)
      }}
    />
  </div>
);

Controller.propTypes = {
  threshold: PropTypes.number.isRequired,
  setThreshold: PropTypes.func.isRequired,
};

export default Controller;