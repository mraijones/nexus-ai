import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: [
      '@supabase/supabase-js',
      '@supabase/gotrue-js',
      '@supabase/postgrest-js',
      '@supabase/realtime-js',
      '@supabase/storage-js',
    ],
  },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('/react-dom/')) return 'react-dom';
          if (id.includes('/react-router/')) return 'react-router';
          if (id.includes('/react-router-dom/')) return 'react-router';
          if (id.includes('/@supabase/')) return 'supabase';
          if (id.includes('/@radix-ui/')) return 'radix';
          if (id.includes('/@stripe/')) return 'stripe';
          if (id.includes('/lucide-react/')) return 'lucide';
          if (id.includes('/recharts/')) return 'recharts';

          return;
        },
      },
    },
  },
});
