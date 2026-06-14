import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import { afterEach, expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

/**
 * @jest-environment jsdom
 */

afterEach(() => {
  cleanup();
});

test('renders with correct title', () => {
  render(<App />);

  expect(document.title).toEqual('Andrew Puglionesi');
});

test('renders home page headings', () => {
  render(<App />);

  expect(screen.getByRole('heading', {name: 'Andrew Puglionesi'})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: 'About Me'})).toBeInTheDocument();
  expect(screen.getByRole('heading', {name: 'News'})).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);

  verifyLinkPresent('Home', '/');
  verifyLinkPresent('Resume', '/resume');
  verifyLinkPresent('Blog', '/blog/all');
  verifyLinkPresent('Bio', '/biography');
  verifyLinkPresent('Photos', '/photography');
  verifyLinkPresent('Contact', '/contact');
});

function verifyLinkPresent(expectedText, expectedHref) {
  let element = screen.getByRole('link', {name: expectedText});
  expect(element).toBeInTheDocument();
  expect(element.getAttribute('href')).toEqual(expectedHref);
}
