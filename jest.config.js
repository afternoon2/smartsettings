module.exports = {
  preset: 'ts-jest',
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageDirectory: './coverage',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/', '/src/sass/'],
  transform: {
    '.+\\.sass$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  modulePathIgnorePatterns: ['src/sass/*.sass'],
  moduleFileExtensions: ['ts', 'js', 'sass'],
};
