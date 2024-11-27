import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const generateFirebaseConfig = () => {
    const firebaseConfig = {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
    };

    console.log('Firebase config:', firebaseConfig);

    const filteredConfig = Object.fromEntries(
      Object.entries(firebaseConfig).filter(([_, v]) => v != null)
    );

    console.log('Filtered config:', filteredConfig);

    const configContent = `const firebaseConfig = ${JSON.stringify(filteredConfig, null, 2)};`;
    writeFileSync('public/firebase-config.js', configContent);
  };

  return {
    plugins: [
      react(),
      {
        name: 'generate-firebase-config',
        buildStart() {
          generateFirebaseConfig();
        },
      },
    ],
    server: {
      host: '0.0.0.0', // This ensures the server is accessible from external connections
      port: 3000,
      strictPort: true, // This ensures Vite only uses port 3000
      hmr: {
        clientPort: 443, // This helps with HTTPS tunneling
      }
    },
    define: {
      'process.env': env
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});

