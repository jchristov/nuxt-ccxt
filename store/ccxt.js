import ccxt from 'ccxt'

export const state = () => ({
  timeout: 3 * 1000,
  timer: null,
  exchangeList: [
    'bitbank', 'bitflyer', 'btcbox', 'coincheck', 'quoinex', 'zaif', 'binance'
  ],
  orderbooks: []
})

export const mutations = {
  setTimeout (state, payload) {
    state.timeout = payload
  },
  setTimer (state, payload) {
    state.timer = payload
  },
  setExchangeList (state, payload) {
    state.exchangeList = payload || []
  },
  setOrderbooks (state, payload) {
    state.orderbooks = payload
  }
}

export const getters = {
  exchanges (state) {
    let exchanges = ccxt.exchanges
      .filter(el => state.exchangeList.find(d => d === el))
      .map(id => new (ccxt)[id]())
    console.log('ccxt getters exchanges %o', exchanges)
    return exchanges
  },
  orderbooks (state) {
    return state.orderbooks
  }
}

export const actions = {
  setTimeout ({commit}, payload) {
    commit('setTimeout', payload)
  },
  setExchangeList ({commit}, payload) {
    commit('setExchangeList', payload)
  },
  startGetOrderbooks ({state, getters, commit, dispatch}, payload) {
    getters.exchanges.forEach(el => {
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
      dispatch('startGetOrderbooks')
    }, state.timeout)
    commit('setTimer', timer)
  },
  stopGetOrderbooks ({state, commit}, payload) {
    clearTimeout(state.timer)
  }
}
