
export default {
  testEnvironment: "jest-environment-jsdom",  // jsdom environment for browser-like tests
  transform: {
    '^.+\\.js$': 'babel-jest',               // Use babel-jest to transpile JS
  },
  moduleFileExtensions: ["js", "mjs", "json", "node"], // Support for .js and .mjs files
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',          // For handling CSS imports in tests
  },
};