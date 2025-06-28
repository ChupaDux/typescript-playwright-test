# SauceDemo Playwright Test Suite

A comprehensive end-to-end test automation suite for the [SauceDemo](https://www.saucedemo.com) e-commerce website using Playwright and TypeScript.

##  Prerequisites

Before you can run these tests, you need to have Node.js and npm installed on your system.

### Installing Node.js and npm

#### Windows
1. **Download Node.js**: Go to [nodejs.org](https://nodejs.org/) and download the LTS version
2. **Run the installer**: Double-click the downloaded `.msi` file and follow the installation wizard
3. **Verify installation**: Open Command Prompt or PowerShell and run:
   ```cmd
   node --version
   npm --version
   ```

#### macOS
1. **Using Homebrew** (recommended):
   ```bash
   # Install Homebrew if you don't have it
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   
   # Install Node.js and npm
   brew install node
   ```

2. **Using the official installer**: Download from [nodejs.org](https://nodejs.org/) and follow the installation steps

3. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

#### Linux (CentOS/RHEL/Fedora)
```bash
# Install Node.js and npm
sudo dnf install nodejs npm

# Verify installation
node --version
npm --version
```

##  Quick Start

### 1. Clone or Download the Project
```bash
# If using git
git clone 
cd saucedemo-playwright-tests

# Or download and extract the project files
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install chromium
```

### 4. Set Up Environment Variables
```bash
# Copy the example environment file
cp .env.example .env
```

The `.env` should have everything **EXCEPT** `TEST_USERNAME` and `TEST_PASSWORD`, you can use any user you want to run same tests with different users., for example, **TEST_USERNAME=error_user**
```env
TEST_USERNAME={YOUR_PROVIDED_USER}
TEST_PASSWORD={YOUR_PROVIDED_USER_PASSWORD}
CHECKOUT_FIRST_NAME=John
CHECKOUT_LAST_NAME=Doe
CHECKOUT_ZIP_CODE=12345
TEST_PRODUCT_1="Sauce Labs Backpack"
TEST_PRODUCT_2="Sauce Labs Bike Light"
```

### 5. Run the Tests
```bash
# Run all tests (Chrome will not be visible by default)
npm test

# Alternative commands
npm run test:headed    # Same as npm test (Chrome visible)
npm run test:debug     # Run in debug mode with step-by-step execution
```

##  Project Structure

```
├── config/
│   └── TestConfig.ts          # Environment configuration management
├── pages/
│   ├── BasePage.ts            # Common page functionality (menu, logout, etc.)
│   ├── LoginPage.ts           # Login page actions and verifications
│   ├── InventoryPage.ts       # Product catalog and cart operations
│   ├── CartPage.ts            # Shopping cart management
│   ├── CheckoutPage.ts        # Checkout process handling
│   └── CheckoutCompletePage.ts # Order completion verification
├── tests/
│   └── saucelabs.test.ts      # Main test suite with all scenarios
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore file
├── package.json               # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration
└── README.md                  # This file
```

##  Test Scenarios Covered

### 1. **Login Test**
- Verifies successful login with valid credentials
- Confirms redirect to inventory page

### 2. **Add to Cart Test**
- Adds multiple products to cart
- Verifies cart icon shows correct item count
- Confirms products appear in cart with accurate quantities

### 3. **Complete Checkout Process**
- Full end-to-end purchase flow
- Form validation for checkout information
- Price calculation verification (item total + tax = total)
- Order completion confirmation
- Cart emptying after successful order

### 4. **Reset App State**
- Adds products to cart
- Uses sidebar menu to reset application state
- Verifies cart is cleared and app returns to initial state

### 5. **Logout Test**
- Opens sidebar menu and logs out
- Confirms return to login page

### 6. **Complete User Journey**
- Comprehensive test covering entire user workflow
- Login → Add Products → Checkout → Complete Order → Logout

##  Configuration

### Environment Variables
All test data is managed through environment variables in the `.env` file:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `TEST_USERNAME` | SauceDemo login username | `` |
| `TEST_PASSWORD` | SauceDemo login password | `` |
| `CHECKOUT_FIRST_NAME` | Test checkout first name | `John` |
| `CHECKOUT_LAST_NAME` | Test checkout last name | `Doe` |
| `CHECKOUT_ZIP_CODE` | Test checkout ZIP code | `12345` |
| `TEST_PRODUCT_1` | First test product name | `Sauce Labs Backpack` |
| `TEST_PRODUCT_2` | Second test product name | `Sauce Labs Bike Light` |

### Browser Configuration
- **Current Setup**: Chrome only (headless mode)
- **Head Mode**: Set `headless: false ` in `playwright.config.ts` to run with UI
- **Multiple Browsers**: Add Firefox/Safari projects in `playwright.config.ts` if needed

##  Test Reports

After running tests, Playwright generates an HTML report:

```bash
# View the test report
npx playwright show-report
```

The report includes:
- Test execution results
- Screenshots of failures
- Execution traces for debugging
- Performance metrics

##  Debugging

### Debug Mode
```bash
npm run test:debug
```
This opens Playwright Inspector for step-by-step test execution.

### Common Issues and Solutions

1. **"Cannot read properties of undefined"**
    - Ensure all environment variables are set in `.env`
    - Verify Node.js and npm are properly installed

2. **Browser not opening**
    - Run `npx playwright install chromium`
    - Check that `headless: false` is set in config if you want browser to be visible

3. **Environment variable errors**
    - Verify `.env` file exists and has correct format
    - Ensure no extra spaces around the `=` sign

4. **Tests failing on specific elements**
    - Check if SauceDemo website structure has changed
    - Verify selectors in page object files

##  Best Practices Implemented

- ✅ **Page Object Model**: Clean, maintainable test structure
- ✅ **Environment Configuration**: Secure credential management
- ✅ **Stable Selectors**: Uses `data-test` attributes when available
- ✅ **No Hard Timeouts**: Event-based waiting with Playwright assertions
- ✅ **Comprehensive Assertions**: Validates both UI state and data accuracy
- ✅ **Modular Design**: Reusable page objects and test utilities
- ✅ **Security**: No hardcoded credentials in source code
