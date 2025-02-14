import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      // /"proxy"로 시작하는 프록시 요청
      '/proxy': {
        target: 'https://oaidalleapiprodscus.blob.core.windows.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''), // 전달된 요청에서 "/proxy"를 제거
      },
    },
  },
});
