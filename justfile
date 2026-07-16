# List available recipes
default:
    @just --list

# Install dependencies
install:
    npm install

# Start the dev server
dev:
    npm run dev

# Build the production site
build:
    npm run build

# Preview the production build
preview:
    npm run preview

# Run unit tests
test:
    npm test

# Run unit tests in watch mode
test-watch:
    npm run test:watch

# Run unit tests with coverage report
coverage:
    npm run test:coverage

# Run end-to-end tests
e2e:
    npm run test:e2e

# Run all tests (unit + e2e)
test-all: test e2e

# Scaffold a new writing
new:
    npm run new
