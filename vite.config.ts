import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    // 청크 사이즈 경고 해결을 위한 설정 추가
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: ['zod'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
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
