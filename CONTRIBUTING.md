# The Weather-app Contributing Guide

Hi! I'm really excited that you are interested in contributing to Weather-app. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [The Architectural Methodology](#the-architectural-methodology)
- [FSD settings from eslint-plugin-boundaries](#fsd-settings-from-eslint-plugin-boundaries)
- [Naming of Branches](#naming-of-branches)
- [Naming of Commits](#naming-of-commits)
- [Development Setup](#development-setup)
- [Code of Conduct](https://github.com/Roman-wdesign/Weather-app/blob/main/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)

## The Architectural Methodology

In this App use the [FSD](https://feature-sliced.design/docs) Architectural methodology.

## FSD settings from eslint-plugin-boundaries

Rules: prohibition of cross imports (except those inside features). That is, a feature cannot import a feature. The page cannot import the page, and so on. More details into the [.eslintrc.cjs](https://github.com/Roman-wdesign/Weather-app/blob/main/.eslintrc.cjs)

**Example of the error**

![Example of the error](https://i.ibb.co/B6GzgH5/Screenshot-1.png)

## Naming of Branches

In git you can create folders and subfolders. Just add / in the branch name and your branch will get the following folder/name structure. This feature helps sort branches in git.

- `build` changes regarding the build process (npm, vite)
- `chore` changes that do not directly affect the code, something that the end user will not see (installing/removing dependencies, setting up a project/tools)
- `ci` changes regarding CI/CD
- `docs` changes regarding documentation
- `feat` new feature
- `fix` bug fix
- `perf` performance improvements
- `refactor` code refactoring
- `revert` commit cancel
- `style` style changes
- `test` adding missing tests or correcting existing tests

Examples:

```
feat/DEV-666-add-custom-input

fix/DEV-1125-issue-with-user-avatar-dimensions

chore/DEV-25-upgrade-vite-version

style/add-outline-to-primary-button
```

## Naming of Commits

Logical code codes are easy to sort, and selecting a commit type becomes a trivial group. You have added a new function - this is the type feat. Fixed a bug - this is a type of correction. We refactored the code without changing the main logic of the work - this is a type of refactoring. Etc.

After adding the commit type, you put :, a space, and write a short generic name of what exactly you did. The message itself should be written in the imperative mood, begin, as a rule, with a verb (“add”, “remove”, “correct”, “change”, etc.) and not contain any punctuation at the end.

Examples:

```
feat: add booking widget to product page

refactor: remove info button in tariff card

ci: update CI/CD for performance reason
```

If you want to describe in detail the work done, then create a large commit message with a header, message body and footer (optional). The git commit command will help you with this, which opens the code editor built into the command line shell (vim, nano, etc.). You can also use the GUI option in your IDE.

Examples:

```
# HEADING
feat: add button for loading new posts

# BODY
Add a button for loading new posts on blog page. It can be hidden if there're no more info and shown if it exists.

There is a small delay on button hidding(maybe it's a problem with rerendering), so it needs to be fixed on future refactoring.

# FOOTER(optional)
Signed-of-by: John Doe
Issue: DEV-123
```

## Development Setup

You will need [Node.js](https://nodejs.org) **version 21.6.11+**, and [NPM](https://docs.npmjs.com/cli/v10/commands/npm-install) **version 10.3.0+**.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
