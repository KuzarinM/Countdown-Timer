import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenvExpand from 'dotenv-expand';
import { Console } from 'node:console';

// https://vitejs.dev/config/


export default defineConfig(({ command, mode }) => {

    const env = loadEnv(mode, process.cwd(), '');
    dotenvExpand.expand({ parsed: env });
    console.log(process)
    
  return  { 
    plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  }
}
});

