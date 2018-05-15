import {Router} from 'express'
import ccxt from 'ccxt'

const router = Router()

export const state = {
  timeout: 3 * 1000,
  timer: null,
  exchangeList: [
    'bitbank', 'bitflyer', 'btcbox', 'coincheck', 'quoinex', 'zaif', 'binance'
  ],
  orderbooks: []
}

export const mutations = {
  setTimeout (payload) {
    state.timeout = payload
  },
  setTimer (payload) {
    state.timer = payload
  },
  setExchangeList (payload) {
    state.exchangeList = payload || []
  },
  setOrderbooks (payload) {
    state.orderbooks = payload
  }
}

export const getters = {
  exchanges () {
    let exchanges = ccxt.exchanges
      .filter(el => state.exchangeList.find(d => d === el))
      .map(id => new (ccxt)[id]())
    console.log('ccxt getters exchanges %o', exchanges)
    return exchanges
  },
  orderbooks () {
    return state.orderbooks
  }
}

export const actions = {
  setTimeout (payload) {
    mutations['setTimeout'](payload)
  },
  setExchangeList (payload) {
    mutations['setExchangeList'](payload)
  },
  startGetOrderbooks (payload) {
    getters['exchanges'].forEach(el => {
      el.fetch_order_book('BTC/JPY').then(orderbook => {
        let ob = state.orderbooks.find(o => o.name === el.name)
        console.log('ccxt actions getItems orderbook %o', orderbook)
        let bids = orderbook['bids']
        let asks = orderbook['asks']
        if (ob) {
          ob.bids = bids
          ob.asks = asks
        } else {
          state.orderbooks.push({name: el.name, bids: bids, asks: asks})
        }
      }).catch(error => {
        console.log('ccxt actions getItems catch error %o', error)
      })
    })
    let timer = setTimeout(() => {
      actions['startGetOrderbooks']()
    }, state.timeout)
    mutations['setTimer'](timer)
  },
  stopGetOrderbooks (payload) {
    clearTimeout(state.timer)
  }
}

router.get('ccxt', (req, res) => {
  res.json({
    timeout: state.timeout,
    exchangeList: state.exchangeList
  })
})
router.post('ccxt/start', (req, res) => {
  console.log('ccxt/start req %o', req)
  if (req.body) {
    let timeout = req.body.timeout
    if (timeout) {
      actions.setTimeout(timeout)
    }
    let exchangeList = req.body.exchangeList
    if (exchangeList) {
      actions.setExchangeList(exchangeList)
    }
  }
  actions.startGetOrderbooks()
  res.json('Ok')
})

router.post('ccxt/stop', (req, res) => {
  console.log('ccxt/stop req %o', req)
  actions.stopGetOrderbooks()
  res.json('Ok')
})

export default router
