module.exports = {
  // setupFilesAfterEnv runs after the test env is present
  // so jest globals can be used here contrary to SetupFiles
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testMatch: ['<rootDir>/tests/*.test.js'],
};
