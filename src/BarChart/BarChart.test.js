import React from 'react';
import { groupRanges } from './';

describe('Bar chart tests', () => {
  it('groupRanges works properly', () => {
    const mockGraphData = [
      { value: -10.577542870894789, timestamp: 1570190236000},
      { value: 52.194611077785595, timestamp: 1570190236358},
      { value: -55.81929826449543, timestamp: 1570190242211},
      { value: -47.9218145726422, timestamp: 1570190251982},
      { value: -11.740520738689014, timestamp: 1570190253032},
    ];
    
    expect(groupRanges(mockGraphData)).toEqual({
      '50': [52.194611077785595],
      '-20': [-10.577542870894789, -11.740520738689014],
      '-50': [-47.9218145726422],
      '-60': [-55.81929826449543],
    });
  });
  
});
