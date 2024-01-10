module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../src/$1',
    '^@presentation/(.*)$': '<rootDir>/../src/presentation/$1',
    '^@application/(.*)$': '<rootDir>/../src/application/$1',
    '^@infra/(.*)$': '<rootDir>/../src/infra/$1',
    '^@domain/(.*)$': '<rootDir>/../src/domain/$1',
  },
};
