import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';

export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      exclude: /[\\/]node_modules[\\/]/,
    }),
    pluginSolid(),
  ],
  html: {
    tags: [{ tag: 'body', attrs: { class: 'dark:bg-neutral-900' } }],
    title: 'Expensify',
  },
  server: {
    port: 3001,
  },
});
