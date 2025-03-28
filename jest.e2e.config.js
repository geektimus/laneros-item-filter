module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.e2e.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.e2e.setup.js'],
  testTimeout: 30000
}; 