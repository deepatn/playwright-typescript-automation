# Playwright Cucumber Automation

![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-green?style=for-the-badge)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-blue?style=for-the-badge)
![Allure](https://img.shields.io/badge/Allure-Reporting-purple?style=for-the-badge)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-orange?style=for-the-badge)

---

## 🚀 Features

- **End-to-end tests** with Playwright
- **BDD-style scenarios** using Cucumber
- **Page Object Model** for maintainable code
- **Allure & HTML test reports**
- **Jenkins integration** for CI/CD

---

## 📁 Project Structure

```text
features/           # Cucumber feature files & step definitions
pageobjects/        # Page Object classes
Utils/              # Utilities & test data
tests/              # Playwright test specs
allure-report/      # Allure report output
playwright-report/  # Playwright HTML report output
```

---

## ⚡ Setup

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd playwright
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run tests:**
   ```bash
   npx playwright test
   ```
   or for Cucumber:
   ```bash
   npx cucumber-js
   ```

---

## 📊 Reports

- **Allure:** Open `allure-report/index.html`
- **Playwright:** Open `playwright-report/index.html`

---

## 🛠 CI/CD

- Jenkins pipeline defined in `JenkinsFile`

---

## ⚙️ Configuration

- Playwright config: `playwright.config.ts`
- TypeScript config: `tsconfig.json`

---

