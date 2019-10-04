import React from 'react';
import { generateLines, getScale, timeScaling } from './';

describe('Line chart tests', () => {
  const mockData = [
    { value: -73.3471584187495, timestamp: 1570191003405 },
    { value: 92.4158657302873, timestamp: 1570191009549 },
    { value: 53.933803680902, timestamp: 1570191016939 },
    { value: 62.728641927398684, timestamp: 1570191022236},
  ];
  const mockScaleLow = 100;
  const mockScaleHigh = 500;
  it('generateLines returns an empty array', () => {
    expect(generateLines([])).toEqual([]);
  });
  
  
  it('getScale returns scale properly', () => {
    expect(getScale(mockData)).toEqual(100);
  });
  
  it('generateLine connects points and returns lines', () => {
    expect(generateLines(mockData, mockScaleLow)).toEqual([
      { y1: 433.36789604687374, y2: 18.960335674281765, x1: 0, x2: 61.44 },
      { y1: 18.960335674281765, y2: 115.165490797745, x1: 61.44, x2: 135.34 },
      { y1: 115.165490797745, y2: 93.17839518150329, x1: 135.34, x2: 188.31 },
    ]);
  });
  
  it('timeScaling works properly', () => {
    expect(timeScaling(mockScaleHigh)).toEqual([
      { x: 0, second: 0 },
      { x: 100, second: 50 },
      { x: 200, second: 100 },
      { x: 300, second: 150 },
      { x: 400, second: 200 },
      { x: 500, second: 250 },
      { x: 600, second: 300 },
      { x: 700, second: 350 },
      { x: 800, second: 400 },
      { x: 900, second: 450 },
      { x: 1000, second: 500 },
      { x: 1100, second: 550 },
      { x: 1200, second: 600 },
    ])
  })
});