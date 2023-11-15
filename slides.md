---
marp: true
theme: default
class: invert
---

# Runtime Lockdown 🔐

TypeScript configuration pattern for universal packages.

---

# Kræn Hansen

![bg right](./me.jpg)

Senior Software Engineer @ MongoDB
Contributing to the Atlas Device SDK (formerly Realm JS)

`kraenhansen` on 𝕏

---

# What is a runtime?

Sometimes called "platform" or "environment".

Entails a JavaScript engine, such as
- V8 *(used by Chrome, Node.js, Electron, ...)*
- JavaScript Core *(used by Safari, WebKit browsers and some React Native apps)*
- Hermes *(used by most React Native apps)*
- SpiderMonkey *(used by Firefox)*
- Chakra *(used by Internet Explorer)*
- ...

---

# Runtime specific APIs

## Globals
- `window`
- `navigator`
- `process`
- `fetch`
- `console.log`

## Packages
- `import fs from "node:fs"`
- `import { Platform } from "react-native"`

---

# Universal package

- AKA an isomorphic package:
  - `isomorphic-fetch`
  - `isomorphic-ws`
- Helps building
  - Testable apps
  - Reusable apps (across React Native, Web, Electron, Server-side Node.js)
- Simple when not depending runtime APIs or other runtime specific packages.

---

# Simple universal package

```json
// package.json
{
  "name": "my-lib",
  "type": "module",
  "main": "./index.js"
}
```

```javascript
// index.js
export function greet() {
  return "hi there";
}
```

---

# ~~Runtime checks~~ (don't do it!) 🛑

```typescript
if (typeof window !== "undefined") {
  // Probably in a browser
}
```

```typescript
if (typeof process !== "undefined" &&
    typeof process.release !== "undefined" &&
    process.release.name === "node") {
  // Probably in Node.js
}
```

```typescript
// Renaming `require` to avoid bundling
const nodeRequire = require;
const fetch = nodeRequire("node-fetch");
```

---

# Conditional exports 💙

```json
{
  // ...
  "exports": {
    ".": {
      "node": "./dist/node/index.js",
      "browser": "./dist/browser/index.js",
      "types": "./dist/common/index.d.ts"
    },
  }
  // ...
}
```

See https://nodejs.org/api/packages.html#conditional-exports

---

# Subpath exports 💙

```typescript
import * from "my-lib/common";
```

```json
{
  // ...
  "exports": {
    "./common": {
      "types": "./dist/common/index.d.ts",
      "default": "./dist/common/index.js"
    }
  }
  // ...
}
```

See https://nodejs.org/api/packages.html#subpath-exports

---

# Example package

- `my-lib` - A library package with Node.js and browser dependent code:
  - Uses conditional exports.
  - Uses subpath export of "common" / platform independent code.
  - Uses TypeScript "Project References".
  - Leverages specific tsconfig.json locations (for VS Code support).
- `my-app` - A Vite + React app consuming `my-lib`.

---

# Root `tsconfig-base.json`

- Default compiler options
- `"types": []`
- `"lib": [ "es2022" ]`
- `"noResolve": true`

---

# Root `tsconfig.json`

- `files: []` as it has no files of its own
- `references` to the platform specific projects

---

# `src/common/tsconfig.json`

- For common, runtime independent code
- `"types": []`
- `"lib": ["ES2022"]`
- `"include": ["."]`

---

# `src/browser/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/browser"`
- `"types": []`
- `"lib": ["ES2022", "DOM"]`
- `"include": ["."]`

---

# `src/node/tsconfig.json`

- For Node.js dependent code
- `"outDir": "../../dist/node"`
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"include": ["."]`
