---
name: repo-scaffold
description: Scaffold a production-ready pnpm + Turborepo monorepo with Next.js 15, TypeScript, ESLint, Prettier, Vitest, Playwright, and Husky. Use when the user asks to create a new project, monorepo, scaffold, boilerplate, or starter template.
---

## What This Produces

A complete monorepo scaffold ready for `pnpm install && pnpm dev`:

```
<project>/
├── apps/
│   └── web/                     # Next.js 15 (App Router)
├── packages/
│   ├── ui/                      # Shared React component library
│   ├── lib/                     # Shared utilities
│   ├── typescript-config/       # Shared tsconfig presets
│   ├── eslint-config/           # Shared ESLint config
│   └── prettier-config/         # Shared Prettier config
├── tests/e2e/                   # Playwright E2E tests
├── .husky/pre-commit            # Lint-staged hook
├── turbo.json                   # Turborepo v2 (tasks key)
├── pnpm-workspace.yaml
├── vitest.config.ts
├── Makefile
└── ...config files
```

---

## Before Starting

Ask the user for:

1. **Project name** — used as the directory name and package scope (e.g., `acme` → `@acme/*`)
2. **Description** — one-liner for package.json and README
3. **Any extras** — additional apps, packages, or tooling beyond the default

If the user doesn't specify, use `my-project` and `@my-project/*` as defaults.

---

## Instructions

Create every file listed below. Use the exact content provided, substituting `{{PROJECT}}` for the project name and `{{DESCRIPTION}}` for the description.

### Step 1: Root config files

#### `{{PROJECT}}/package.json`

```json
{
  "name": "{{PROJECT}}",
  "private": true,
  "description": "{{DESCRIPTION}}",
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test --config tests/e2e/playwright.config.ts",
    "clean": "turbo clean && rm -rf node_modules",
    "prepare": "husky"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.0",
    "husky": "^9.1.0",
    "lint-staged": "^15.2.0",
    "prettier": "^3.4.0",
    "turbo": "^2.3.0",
    "vitest": "^2.1.0"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,yml,yaml,css}": ["prettier --write"]
  },
  "packageManager": "pnpm@9.15.0",
  "engines": {
    "node": ">=20"
  }
}
```

#### `{{PROJECT}}/pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

#### `{{PROJECT}}/turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

#### `{{PROJECT}}/tsconfig.json`

```json
{
  "extends": "@{{PROJECT}}/typescript-config/base.json",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

#### `{{PROJECT}}/vitest.config.ts`

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/*/src/**/*.test.ts", "apps/*/src/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "tests/e2e/**"],
  },
});
```

#### `{{PROJECT}}/.prettierignore`

```
node_modules
.next
dist
.turbo
coverage
pnpm-lock.yaml
```

#### `{{PROJECT}}/.gitignore`

```gitignore
# Dependencies
node_modules/

# Build
dist/
.next/
out/

# Turbo
.turbo/

# Test
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.local
.env.*.local

# Debug
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Playwright
test-results/
playwright-report/
```

#### `{{PROJECT}}/Makefile`

```makefile
.PHONY: dev build lint format test test-e2e clean install

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

format:
	pnpm format

test:
	pnpm test

test-e2e:
	pnpm test:e2e

clean:
	pnpm clean
```

#### `{{PROJECT}}/README.md`

````markdown
# {{PROJECT}}

{{DESCRIPTION}}

## Getting Started

```bash
pnpm install
pnpm dev
```

## Project Structure

| Path | Description |
|------|-------------|
| `apps/web` | Next.js 15 web application |
| `packages/ui` | Shared React component library |
| `packages/lib` | Shared utility functions |
| `packages/typescript-config` | Shared TypeScript configs |
| `packages/eslint-config` | Shared ESLint config |
| `packages/prettier-config` | Shared Prettier config |
| `tests/e2e` | Playwright end-to-end tests |

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format all files with Prettier |
| `pnpm test` | Run unit tests (Vitest) |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm clean` | Remove build artifacts and node_modules |
````

---

### Step 2: Husky

#### `{{PROJECT}}/.husky/pre-commit`

```sh
pnpm lint-staged
```

Make this file executable after writing it: `chmod +x {{PROJECT}}/.husky/pre-commit`

---

### Step 3: Shared packages

#### `{{PROJECT}}/packages/typescript-config/package.json`

```json
{
  "name": "@{{PROJECT}}/typescript-config",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "files": ["*.json"]
}
```

#### `{{PROJECT}}/packages/typescript-config/base.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022"],
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "exclude": ["node_modules", "dist"]
}
```

#### `{{PROJECT}}/packages/typescript-config/nextjs.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "allowJs": true,
    "incremental": true,
    "plugins": [{ "name": "next" }]
  }
}
```

#### `{{PROJECT}}/packages/typescript-config/react-library.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "react-jsx",
    "outDir": "dist"
  }
}
```

#### `{{PROJECT}}/packages/eslint-config/package.json`

```json
{
  "name": "@{{PROJECT}}/eslint-config",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "type": "module",
  "exports": {
    ".": "./index.js"
  },
  "dependencies": {
    "@typescript-eslint/eslint-plugin": "^8.18.0",
    "@typescript-eslint/parser": "^8.18.0",
    "eslint-config-next": "^15.1.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.1.0"
  },
  "peerDependencies": {
    "eslint": "^9.0.0"
  }
}
```

#### `{{PROJECT}}/packages/eslint-config/index.js`

```js
export default {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  settings: {
    react: { version: "detect" },
  },
  ignorePatterns: ["dist/", ".next/", "node_modules/"],
};
```

#### `{{PROJECT}}/packages/prettier-config/package.json`

```json
{
  "name": "@{{PROJECT}}/prettier-config",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "type": "module",
  "exports": {
    ".": "./index.js"
  }
}
```

#### `{{PROJECT}}/packages/prettier-config/index.js`

```js
export default {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
};
```

#### `{{PROJECT}}/packages/ui/package.json`

```json
{
  "name": "@{{PROJECT}}/ui",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint src/",
    "build": "tsc --build"
  },
  "devDependencies": {
    "@{{PROJECT}}/eslint-config": "workspace:*",
    "@{{PROJECT}}/typescript-config": "workspace:*",
    "eslint": "^9.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.7.0"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

#### `{{PROJECT}}/packages/ui/tsconfig.json`

```json
{
  "extends": "@{{PROJECT}}/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

#### `{{PROJECT}}/packages/ui/src/index.ts`

```ts
export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}
```

#### `{{PROJECT}}/packages/lib/package.json`

```json
{
  "name": "@{{PROJECT}}/lib",
  "version": "0.0.0",
  "private": true,
  "license": "MIT",
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "eslint src/",
    "build": "tsc --build"
  },
  "devDependencies": {
    "@{{PROJECT}}/eslint-config": "workspace:*",
    "@{{PROJECT}}/typescript-config": "workspace:*",
    "eslint": "^9.0.0",
    "typescript": "^5.7.0"
  }
}
```

#### `{{PROJECT}}/packages/lib/tsconfig.json`

```json
{
  "extends": "@{{PROJECT}}/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

#### `{{PROJECT}}/packages/lib/src/index.ts`

```ts
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

---

### Step 4: Next.js 15 web app

#### `{{PROJECT}}/apps/web/package.json`

```json
{
  "name": "@{{PROJECT}}/web",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@{{PROJECT}}/lib": "workspace:*",
    "@{{PROJECT}}/ui": "workspace:*",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@{{PROJECT}}/eslint-config": "workspace:*",
    "@{{PROJECT}}/typescript-config": "workspace:*",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "typescript": "^5.7.0"
  }
}
```

#### `{{PROJECT}}/apps/web/next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@{{PROJECT}}/ui", "@{{PROJECT}}/lib"],
};

export default nextConfig;
```

#### `{{PROJECT}}/apps/web/tsconfig.json`

```json
{
  "extends": "@{{PROJECT}}/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### `{{PROJECT}}/apps/web/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: system-ui, -apple-system, sans-serif;
}
```

#### `{{PROJECT}}/apps/web/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "{{PROJECT}}",
  description: "{{DESCRIPTION}}",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

#### `{{PROJECT}}/apps/web/app/page.tsx`

```tsx
import { Button } from "@{{PROJECT}}/ui";
import { cn } from "@{{PROJECT}}/lib";

export default function Home() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-4 p-8",
      )}
    >
      <h1 className="text-4xl font-bold">{{PROJECT}}</h1>
      <p className="text-lg text-gray-600">{{DESCRIPTION}}</p>
      <Button>Get Started</Button>
    </main>
  );
}
```

Create an empty directory at `{{PROJECT}}/apps/web/public/` (place a `.gitkeep` inside it).

---

### Step 5: Playwright E2E

#### `{{PROJECT}}/tests/e2e/playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "pnpm --filter @{{PROJECT}}/web dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

#### `{{PROJECT}}/tests/e2e/example.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/{{PROJECT}}/i);
});
```

---

### Step 6: Post-scaffold

After creating all files:

1. Run `chmod +x {{PROJECT}}/.husky/pre-commit`
2. Run `cd {{PROJECT}} && pnpm install`
3. Run `pnpm build` to verify everything compiles
4. Run `pnpm dev` to confirm the dev server starts

Report the result to the user. If `pnpm install` or `pnpm build` fails, fix the issue before reporting success.

---

## Customization Notes

- **Adding Tailwind CSS**: Install `tailwindcss`, `postcss`, `autoprefixer` in `apps/web` and add `tailwind.config.ts` + `postcss.config.js`. The `globals.css` already includes the `@tailwind` directives.
- **Adding a second app**: Copy `apps/web/` to `apps/<name>/`, update `package.json` name and port, and it's automatically picked up by the workspace.
- **Adding a database**: Create `packages/db/` with Drizzle or Prisma, following the same tsconfig/eslint pattern as `packages/lib/`.
