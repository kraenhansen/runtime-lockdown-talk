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
`kraenhansen` on 𝕏

---

# What's a runtime?

- Runtime
- Platform
- Environment
- JS engine

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

# Conditional exports 🎉

```json
{
  // ...
  "exports": {
    "types": "./dist/index.d.ts",
    "node": "./dist/node/index.js",
    "browser": "./dist/browser/index.js"
  }
  // ...
}
```

See https://nodejs.org/api/packages.html#conditional-exports

---

# Example package

- `my-lib` - A library package with Node.js and browser dependent code.
  - Uses conditional exports.
  - Uses TypeScript "Project References".
  - Uses position 
- `my-app` - Vite + React app consuming `my-lib`.

---

# Root `tsconfig.json`

- Default compiler options
- `references` to the other files

---

# `./src/tsconfig.json`

- For common, runtime independent code
- `"types": []`
- `"lib": ["ES2022"]`
- `"include": ["."]`
- `"exclude": ["./browser", "./node"]`

---

# `./src/browser/tsconfig.json`

- For Node.js dependent code
- `"types": []`
- `"lib": ["ES2022", "DOM"]`
- `"include": ["."]`
- `"exclude": []`

---

# `./src/node/tsconfig.json`

- For Node.js dependent code
- `"types": ["node"]`
- `"lib": ["ES2022"]`
- `"include": ["."]`
- `"exclude": []`
