module.exports = {
  roots: ["<rootDir>/utils"],
  preset: 'ts-jest',
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
