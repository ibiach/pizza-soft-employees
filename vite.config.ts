import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { ViteAliases } from 'vite-aliases';

const aliasOptions = { dir: 'src', prefix: '@', deep: true, useConfig: false };

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    build: {
      outDir: './public/dist',
      minify: true,
    },
    plugins: [react(), ViteAliases(aliasOptions)],
    server: {
      port: 3000,
    },
  });
};
