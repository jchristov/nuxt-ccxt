require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(4);






const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());

app.set('port', port);

// Import API Routes
app.use('/api', __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(6);
config.dev = !("development" === 'production');

// Init Nuxt.js
const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
  const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log(`Server listening on ${host}:${port}`);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ccxt__ = __webpack_require__(7);





const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Add USERS Routes
router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);
router.use(__WEBPACK_IMPORTED_MODULE_2__ccxt__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

// Mock Users
const users = [{ name: 'Alexandre' }, { name: 'Pooya' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-ccxt',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
  },
  mode: 'spa',
  plugins: ['~/plugins/firebase', '~/plugins/vuetify'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: ['@nuxtjs/axios'],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['firebase', 'vuetify'],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ccxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ccxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ccxt__);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

const state = {
  timeout: 3 * 1000,
  timer: null,
  exchangeList: ['bitbank', 'bitflyer', 'btcbox', 'coincheck', 'quoinex', 'zaif', 'binance'],
  orderbooks: []
};
/* unused harmony export state */


const mutations = {
  setTimeout(payload) {
    state.timeout = payload;
  },
  setTimer(payload) {
    state.timer = payload;
  },
  setExchangeList(payload) {
    state.exchangeList = payload || [];
  },
  setOrderbooks(payload) {
    state.orderbooks = payload;
  }
};
/* unused harmony export mutations */


const getters = {
  exchanges() {
    let exchanges = __WEBPACK_IMPORTED_MODULE_1_ccxt___default.a.exchanges.filter(el => state.exchangeList.find(d => d === el)).map(id => new __WEBPACK_IMPORTED_MODULE_1_ccxt___default.a[id]());
    console.log('ccxt getters exchanges %o', exchanges);
    return exchanges;
  },
  orderbooks() {
    return state.orderbooks;
  }
};
/* unused harmony export getters */


const actions = {
  setTimeout(payload) {
    mutations['setTimeout'](payload);
  },
  setExchangeList(payload) {
    mutations['setExchangeList'](payload);
  },
  startGetOrderbooks(payload) {
    getters['exchanges'].forEach(el => {
      el.fetch_order_book('BTC/JPY').then(orderbook => {
        let ob = state.orderbooks.find(o => o.name === el.name);
        console.log('ccxt actions getItems orderbook %o', orderbook);
        let bids = orderbook['bids'];
        let asks = orderbook['asks'];
        if (ob) {
          ob.bids = bids;
          ob.asks = asks;
        } else {
          state.orderbooks.push({ name: el.name, bids: bids, asks: asks });
        }
      }).catch(error => {
        console.log('ccxt actions getItems catch error %o', error);
      });
    });
    let timer = setTimeout(() => {
      actions['startGetOrderbooks']();
    }, state.timeout);
    mutations['setTimer'](timer);
  },
  stopGetOrderbooks(payload) {
    clearTimeout(state.timer);
  }
};
/* unused harmony export actions */


router.get('ccxt', (req, res) => {
  res.json({
    timeout: state.timeout,
    exchangeList: state.exchangeList
  });
});
router.post('ccxt/start', (req, res) => {
  console.log('ccxt/start req %o', req);
  if (req.body) {
    let timeout = req.body.timeout;
    if (timeout) {
      actions.setTimeout(timeout);
    }
    let exchangeList = req.body.exchangeList;
    if (exchangeList) {
      actions.setExchangeList(exchangeList);
    }
  }
  actions.startGetOrderbooks();
  res.json('Ok');
});

router.post('ccxt/stop', (req, res) => {
  console.log('ccxt/stop req %o', req);
  actions.stopGetOrderbooks();
  res.json('Ok');
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("ccxt");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map