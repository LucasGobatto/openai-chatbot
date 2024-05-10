/** @type {import('jest').Config} */
export default {
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy',
  },
  setupFiles: ['./setup.jest.js'],
  testMatch: ['**/*.test.jsx'],
};
