import React from 'react';
import { generateLines, getScale } from './';

describe('Line chart tests', () => {
  const mockData = [
    { value: -73.3471584187495, timestamp: 1570191003405 },
    { value: 92.4158657302873, timestamp: 1570191009549 },
    { value: 53.933803680902, timestamp: 1570191016939 },
    { value: 62.728641927398684, timestamp: 1570191022236},
  ];
  const mockScaleLow = 100;
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
  })
});