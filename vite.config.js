import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  env: {
    VITE_API_URL: 'http://localhost:8000/api/v1',
    VITE_SOCKET_ENDPOINT: 'http://localhost:5173'
  }
  
})
