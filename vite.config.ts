import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/task-manager-application/',
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/x-date-pickers', 'date-fns'],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
})
