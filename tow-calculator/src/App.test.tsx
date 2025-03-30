/**
 * Tow Calculator | towcalculator.app
 * Copyright (c) 2025 Abrom Douglas III
 * Licensed under the MIT License (see LICENSE file for details).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

