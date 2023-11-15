export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
    // process `*.tsx` files with `ts-jest`
  },
  transformerConfig: {
    
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
}
