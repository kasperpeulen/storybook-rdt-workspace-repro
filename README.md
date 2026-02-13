# Storybook react-docgen-typescript workspace repro

Reproduces [#33837](https://github.com/storybookjs/storybook/discussions/33837): `react-docgen-typescript` doesn't extract inherited MUI props when importing a component from a workspace package.

## Setup

```sh
npm install
cd packages/storybook
npm run storybook
```

## The issue

`packages/ui/src/components/Button.tsx` and `packages/storybook/src/components/Button.tsx` are identical — both extend `MuiButtonProps`.

- Importing from `../components/Button` (local) → all MUI props show up in autodocs
- Importing from `@storybook-test/ui` (workspace) → only `label` shows up

Toggle the import in `packages/storybook/src/stories/Button.stories.ts` to see the difference.

## Root cause

The `@joshwooding/vite-plugin-react-docgen-typescript` Vite plugin creates a TS program from files matching its `include` glob (default: `**/**.tsx`), resolved from the Storybook project's working directory. Workspace package files are outside that directory and aren't included as root files in the program. When react-docgen-typescript parses the workspace component, the TS program can't resolve inherited types.

Note: `tsconfigPath` only affects `compilerOptions` — it does **not** change which files are in the TS program.

## Fix

Add workspace package source files to the `include` option in `.storybook/main.ts`:

```ts
typescript: {
  reactDocgen: "react-docgen-typescript",
  reactDocgenTypescriptOptions: {
    include: ["**/**.tsx", "../../packages/ui/src/**/*.tsx"],
  },
},
```
