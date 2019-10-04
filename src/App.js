import React, { useState, useEffect } from 'react';
import SnackBar from 'node-snackbar';
import io from 'socket.io-client';
import LineChart from './LineChart';
import BarChart from './BarChart';
import Controller from './ThresholdControl';

function App () {
  const [graphData, setGraphData] = useState([]);
  const [threshold, setThreshold] = useState(100);
  
  const onData = data => {
    if (data.value > threshold) {
      SnackBar.show({
        text: `Warning, the value is: ${data.value.toFixed(4)}`,
        pos: 'bottom-center',
        backgroundColor: '#323232',
        textColor: '#ffffff',
      });
    }
    setGraphData(value => [...value, data])
  };
  
  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('SOCKET CLIENT CONNECTED');
    });

    socket.on('data', onData);
    return () => socket.close();
  }, []);
  
  // TODO: alternative
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('SOCKET CLIENT CONNECTED');
  //   });
  //   return () => socket.close();
  // }, []);
  //
  // useEffect(() => {
  //   socket.on('data', (data) => {
  //     console.log('threshold:', threshold);
  //     console.log('data.value:', data.value);
  //     if (data.value > threshold) {
  //       SnackBar.show({
  //         text: `Warning, the value is: ${data.value.toFixed(4)}`,
  //         pos: 'bottom-center',
  //         backgroundColor: '#323232',
  //         textColor: '#ffffff',
  //       });
  //     }
  //     setGraphData(value => [...value, data])
  //   });
  // }, [threshold]);
  
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
