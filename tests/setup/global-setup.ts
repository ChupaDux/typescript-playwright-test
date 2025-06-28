import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    // Any global setup can be done here
    // For example, you could warm up the application or set up test data
    console.log('Running global setup...');
}

export default globalSetup;