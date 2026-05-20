import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

// Extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Polyfill ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(global as any).ResizeObserver = ResizeObserver;

// Polyfill IntersectionObserver
class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  takeRecords() { return []; }
}
(global as any).IntersectionObserver = IntersectionObserver as any;

// Mock Prism
const mockPrism = {
  highlight: (code: string) => code,
  languages: {
    javascript: {},
    typescript: {},
    json: {}
  }
};
(global as any).Prism = mockPrism;

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

// Mock motion/react using Proxy for all tags
vi.mock('motion/react', () => {
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, tag: string) => {
        // Handle common React components that might be accessed on motion
        if (tag === '$$typeof' || tag === 'displayName' || tag === 'prototype') return undefined;
        
        return React.forwardRef(({ children, whileHover, whileTap, initial, animate, exit, transition, variants, viewport, onAnimationComplete, ...props }: any, ref: any) => {
          return React.createElement(tag, { ...props, ref }, children);
        });
      },
    }
  );

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Logs errors to help debug
console.error = vi.fn((...args) => {
  console.log('--- REACT ERROR ---', ...args);
});

afterEach(() => {
  cleanup();
});
