import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenvExpand from 'dotenv-expand';

// https://vitejs.dev/config/


export default defineConfig(({ mode }) => {

    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand.expand({ parsed: env });
    
  return  { 
    plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }}
});

