# Webpack me


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install

```bash
npm install
```

## Documentation
### Development
1. run `npm run dev` to start dev-server, default port is `8461` you can modify the port in `src/webpack.dev.conf.js`
2. Insert js and css to wherever you want
```html
<link rel="stylesheet" type="text/css" href="http://localhost:8461/bundle.css" />
<script src="http://localhost:8461/webpack-dev-server/main.js"></script>
<script src="http://localhost:8461/bundle.js"></script>
```

### Production
1. run `npm run build` to compile, and it will build files in `dist/`
2. `index.html` will contain js and css script all you need, copy and replace development path.