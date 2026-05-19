# Playwright CLI Project Instructions

This is a Playwright testing framework project configured for end-to-end testing across multiple browsers.

## Project Overview

- **Framework**: Playwright Test
- **Language**: TypeScript
- **Test Directory**: `/tests`
- **Configuration**: `playwright.config.ts`

## Key Commands

- `npm install` - Install dependencies
- `npm test` - Run all tests
- `npm run test:ui` - Interactive UI mode
- `npm run test:debug` - Debug mode
- `npm run codegen` - Generate test code
- `npm run test:report` - View HTML report

## Development Workflow

1. **Write Tests**: Create `.spec.ts` files in `/tests` directory
2. **Run Tests**: Use `npm test` or `npm run test:ui`
3. **Debug**: Use UI mode or debug mode for troubleshooting
4. **Generate Code**: Use `npm run codegen` to record interactions

## Browser Support

- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Configuration

- **Main Config**: `playwright.config.ts`
- **TypeScript**: `tsconfig.json`
- **Dependencies**: `package.json`

## Important Files

- `tests/example.spec.ts` - Example test file
- `playwright.config.ts` - Test configuration
- `tsconfig.json` - TypeScript settings
- `README.md` - Full project documentation

## Next Steps

1. Install dependencies: `npm install`
2. Run example test: `npm test`
3. Try UI mode: `npm run test:ui`
4. Create your own test files in `/tests`

## Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
