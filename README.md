# react_project_01

This is a serverside structure of Management System Project

It contains API, global error handler, models, migrations, seeders

**Before start a JSON file named config.json ought to be added in config directory.**

config.json file will appear after installing sequelize-cli dependency.

All db connection data have to be added into config.json, like that:
```
{
  "development": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": [username],
    "password": [password],
    "database": [databasename],
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

postgres dialect is a must, because postgres db is used in this project.

**Starting project:**

From main directory you need to type `npm start`. Enjoy it :) 


# DigiSEV - Train Managament service

## Test setup
Setting up your machine: 
1. Testing back-end requires working back-end part, so it is assumed that is is all set.
2. Check node version, if there is a difference between current version in use and Project version - Project version MUST be set as current version 
3. All Jest setup files and 'tests' directory have to be placed in 'server' directory
4. Write Jest unit tests in TypeScript  

### Jest Setup
1. First of all it is assumed that TypeScript is set for the Project
2. In `tsconfig.json` have to add following:
```
{
  "compilerOptions": {
   ...

    "allowJs": true,
    "checkJs": false,

    ...
}
```
3. Add following packages in `package.json` using code below:

```
npm install --save-dev jest ts-jest @babel/preset-env types/jest @types/node babel-jest

```

and set Jest as test tool by adding following script:
```
"scripts": {
        ...
        "test": "jest"
    },
```

4. Create new empty file named `jest.config.ts` and add following code in it:

```
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleDirectories: ["node_modules", "src", "src/application"],
  testEnvironment: "node",
  testPathIgnorePatterns: [],
  modulePaths: ["<rootDir/src/domain>"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  verbose: true,
};

export default config;
```

5. Create new empty file named `babel.config.js` and add following code in it:
```
module.exports = {
    presets: [
        '@babel/preset-env',
    ]
}
```

6. Add code into existing file `.babelrc` so that it looks like this:
```
{
    "presets": [
        "env",
        "stage-3"
    ],
    "plugins": [
        "transform-class-properties",
        "transform-object-rest-spread"
    ],
    "test": [
        "jest"
    ]
}
```

7. All tests must be placed in 'tests' directory
8. All test files must be named in as much as possible describing way and their extension have to be '.test.ts'
e.g. `thisIsTheWayHawTestFileNameShouldLookLike.test.ts`
 
### Jest Advanced information

There are may options available to ease Jest testing process.
Detailed information can be found at: https://jestjs.io/docs/getting-started 

There are two important topics that might be needed during testing process:
## Coverage
1. Coverage will be set as available in `jest.config.ts` by adding ```collectCoverage: true```
2. Other option is to execute ```npx jest --coverage```

Once Coverage is set a directory 'coverage' will appear in the Project

It allows to follow and visualize code covered tests

Coverage might slow down test process, so it is better to set it in `jest.config.ts` and once big picture is clear to switch off by changing 
```collectCoverage: true``` to ```collectCoverage: false```
and reactivate when needed

## Loop test process
This is also useful tool
1. In `package.json` file change 
```
"scripts": {
        ...
        "test": "jest"
    },
```
to
```
"scripts": {
        ...
        "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --watchAll",
    },
```

This will set loop test process and after every test list of options will appear on console:
```
Watch Usage
› Press f to run only failed tests.
› Press o to only run tests related to changed files.
› Press p to filter by a filename regex pattern.
› Press t to filter by a test name regex pattern.
› Press q to quit watch mode.
› Press i to run failing tests interactively.
› Press Enter to trigger a test run.
```

Options wil be selected by typing one of options letter or Enter for restart test



