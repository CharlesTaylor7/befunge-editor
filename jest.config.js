const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  roots: ['<rootDir>'],
  transform: { '^.+\\.(t|j)s$': ['@swc/jest'] },
  testRegex: 'test\\.[t|j]s$',
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
}
