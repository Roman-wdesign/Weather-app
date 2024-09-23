# Weather-app Contributing Guide

Hi! I'm really excited that you are interested in contributing to Weather-app. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Development Setup](#development-setup)
- [Code of Conduct](https://github.com/Roman-wdesign/Weather-app/blob/main/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)

## Development Setup

You will need [Node.js](https://nodejs.org) **version 18.12+**, and [NPM](https://docs.npmjs.com/cli/v10/commands/npm-install) **version 10.3.0+**.

A high level overview of tools used:

- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Vite](https://vitejs.dev/) for development bundling
- [Vitest](https://vitest.dev/) for unit testing
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for static error prevention (outside of types)

## Settings

- [env](#env)
- [npm install](#npm-install)
- [npm run dev](#npm-run-dev)
- [npm run test](#npm-run-test)
- [auto delete](#auto-delete)

#### env

Create file **_.env_** in this poject (no in src directory)

Put your API key from OpenWeather to VITE_WEATHER_SECRET_API_KEY in
**.env** file of this project.

Example

```
VITE_WEATHER_SECRET_API_KEY = 12345
```

prefix **VITE\_** is required for expose as import.meta.env.VITE_WEATHER_SECRET_API_KEY

Your .env file must be added to your .gitignore file

#### npm install

Install dependencies

```
npm install
```

#### npm run dev

Run the App

```
npm run dev
```

Default port

**`http://localhost:5173/`**

#### npm run test

Unit test with Vitest

```
npm run test
```

#### auto delete

in vite.config.ts added settings for autodelete all console.log() before your production.

```
 esbuild: {
    drop: ['console', 'debugger'],
  },
```

## Issue Reporting Guidelines

---

name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**

- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Smartphone (please complete the following information):**

- Device: [e.g. iPhone6]
- OS: [e.g. iOS8.1]
- Browser [e.g. stock browser, safari]
- Version [e.g. 22]

**Additional context**
Add any other context about the problem here.

---

name: Feature request
about: Suggest an idea for this project
title: ''
labels: ''
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
