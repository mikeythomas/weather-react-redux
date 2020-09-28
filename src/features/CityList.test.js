import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { CityList } from './CityList';

test('jest test', () => {
  const { container, asFragment } = render(<CityList />);
  throw screen;
});
