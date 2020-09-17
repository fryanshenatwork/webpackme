# Webpack me


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install

```bash
npm install
```

## Documentation
### Development
run `npm run dev -- --port 8080 --host 0.0.0.0` to start dev-server, default port is `8461` you can modify the port in `src/webpack.dev.conf.js`

### Production
1. run `npm run build` to compile, and it will build files in `dist/`
2. `index.html` will contain js and css script all you need, copy and replace development path.