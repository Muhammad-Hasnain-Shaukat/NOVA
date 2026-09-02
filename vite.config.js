import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        studio: resolve(__dirname, 'studio.html'),
        collection: resolve(__dirname, 'collection.html'),
        atelier: resolve(__dirname, 'atelier.html'),
        streetwear: resolve(__dirname, 'streetwear.html'),
        archives: resolve(__dirname, 'archives.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        productDetail: resolve(__dirname, 'product-detail.html')
      }
    }
  }
});
