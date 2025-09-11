# SauceDemo Playwright Test Suite

This repository contains automated end-to-end tests for [Sauce Demo](https://www.saucedemo.com/) using [Playwright](https://playwright.dev/). The tests cover login, logout, and dashboard functionalities.

## Project Structure

```text
.
├── .gitignore
├── package.json
├── playwright.config.js
├── user.json
├── pages/
│   ├── PageDashboard.js
│   └── PageLogin.js
├── playwright-report/
├── test-results/
├── tests/
│   ├── auth.setup.js
│   ├── dashboard.spec.js
│   └── login.spec.js
```

- **pages/**: Page Object Model classes for the application pages.
- **tests/**: Test specifications and authentication setup.
- **user.json**: Stores authentication state for reusing login sessions.
- **playwright.config.js**: Playwright configuration file.
- **playwright-report/** and **test-results/**: Output directories for test reports and results.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Install dependencies:

   ```sh
   npm install
   ```

2. (Optional) Install Playwright browsers:

   ```sh
   npx playwright install
   ```

### Running Tests

- Run all tests:

  ```sh
  npm test
  ```

- Run only login tests (headed mode):

  ```sh
  npm run test:login
  ```

- Run feature/dashboard tests (headed mode, using authenticated state):

  ```sh
  npm run test:features
  ```

### Test Reports

After running tests, open the HTML report:

```sh
npx playwright show-report
```

Or open `playwright-report/index.html` in your browser.

## Authentication

The test suite uses Playwright's [storage state](https://playwright.dev/docs/auth#reuse-authentication-state) to persist login sessions. The `auth.setup.js` script logs in and saves the session to `user.json`, which is then reused in dashboard tests.

## Folder Details

- **PageLogin.js**: Handles login and logout actions.
- **PageDashboard.js**: Handles dashboard interactions (filtering, cart, etc).
- **login.spec.js**: Tests login and logout scenarios.
- **dashboard.spec.js**: Tests dashboard features (filter, add to cart, etc).
- **auth.setup.js**: Sets up authentication state for reuse.

## License

This project is licensed under the ISC
