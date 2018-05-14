import ccxt from 'ccxt'

const timeout = 3 * 1000
const exchangeList = [
  'bitbank', 'bitflyer', 'btcbox', 'coincheck', 'quoinex', 'zaif'
]
console.log('worker exchangeList %o', exchangeList)

const initialData = () => {
  let exchanges = ccxt.exchanges
    .filter(el => exchangeList.find(d => d === el))
    .map(id => new (ccxt)[id]())
  let items = exchangeList.map(el => ({name: el, bid: null, ask: null}))
  return {exchanges: exchanges, items: items}
}

let {exchanges, items} = initialData()
console.log('worker excanges %o items %o', exchanges, items)

const getItems = () => {
  exchanges.forEach(el => {
    el.fetch_order_book('BTC/JPY').then(orderbook => {
      console.log('worker getItems orderbook %o', orderbook)
      let bid = orderbook['bids'][0][0]
      let ask = orderbook['asks'][0][0]
      let item = items.find(i => el.name === i.name)
      item.bid = bid
      item.ask = ask
    }).catch(error => {
      console.log('worker getItems catch error %o', error)
    })
  })
  setTimeout(() => {
    getItems()
  }, timeout)
}

onmessage = event => {
  if (event.data === 'getItems') {
    postMessage(items)
  }
}

getItems()
