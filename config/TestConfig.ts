require('@dotenvx/dotenvx').config()

export interface TestUrl {
    url: string;
}

export interface TestCredentials {
    username: string;
    password: string;
}

export interface CheckoutInfo {
    firstName: string;
    lastName: string;
    zipCode: string;
}

export interface TestProducts {
    product1: string;
    product2: string;
}

export class TestConfig {
    private static validateEnvVar(varName: string, value: string | undefined): string {
        if (!value) {
            throw new Error(`Environment variable ${varName} is not defined. Please check your .env file.`);
        }
        return value;
    }

    static getUrl(): TestUrl{
        return {
            url: this.validateEnvVar('TEST_URL', process.env.TEST_URL),
        };
    }

    static getCredentials(): TestCredentials {
        return {
            username: this.validateEnvVar('TEST_USERNAME', process.env.TEST_USERNAME),
            password: this.validateEnvVar('TEST_PASSWORD', process.env.TEST_PASSWORD),
        };
    }

    static getCheckoutInfo(): CheckoutInfo {
        return {
            firstName: this.validateEnvVar('CHECKOUT_FIRST_NAME', process.env.CHECKOUT_FIRST_NAME),
            lastName: this.validateEnvVar('CHECKOUT_LAST_NAME', process.env.CHECKOUT_LAST_NAME),
            zipCode: this.validateEnvVar('CHECKOUT_ZIP_CODE', process.env.CHECKOUT_ZIP_CODE),
        };
    }

    static getTestProducts(): TestProducts {
        return {
            product1: this.validateEnvVar('TEST_PRODUCT_1', process.env.TEST_PRODUCT_1),
            product2: this.validateEnvVar('TEST_PRODUCT_2', process.env.TEST_PRODUCT_2),
        };
    }
}
