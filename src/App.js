import React, { useState, useEffect } from 'react';
import SnackBar from 'node-snackbar';
import io from 'socket.io-client';
import LineChart from './LineChart';
import BarChart from './BarChart';
import Controller from './ThresholdControl';

const showSnackbar = text =>
  SnackBar.show({
    text,
    pos: 'bottom-center',
    backgroundColor: '#323232',
    textColor: '#ffffff',
  });

const socket = io('http://localhost:3000');

function App () {
  const [graphData, setGraphData] = useState([]);
  const [threshold, setThreshold] = useState(100);

  useEffect(() => {
    socket.on('data', (data) => {
      if (data.value > threshold) {
        showSnackbar(`Warning, the value is: ${data.value.toFixed(4)}`);
      }
      setGraphData(value => [...value, data])
    });
  }, [threshold]);

  return (
    <div className="App">
      <div style={{ textAlign: 'center' }}>
        <img src={'fyutura_logo.png'} />
      </div>
      <Controller threshold={threshold} setThreshold={setThreshold}/>
      <LineChart graphData={graphData} />
      <BarChart graphData={graphData} />
    </div>
  );
};

export default App;
