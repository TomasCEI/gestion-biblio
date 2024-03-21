# Utilizar Alias @ en vez de ../../../components

tengo que editar vite.config.js para agregar el alias

```js
//.. otros imports
// uso de path para el alias
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  //.. otras configuraciones
  // alias para los imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
})
```


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
