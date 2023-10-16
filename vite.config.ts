import { defineConfig, loadEnv } from 'vite';
import { ViteAliases } from 'vite-aliases';
import react from '@vitejs/plugin-react';

const aliasOptions = { dir: 'src', prefix: '@', deep: true, useConfig: false };

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), ViteAliases(aliasOptions)],
    server: {
      port: 3000,
    },
  });
};
