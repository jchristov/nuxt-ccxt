export default function getItems () {
  const worker = new Worker('~/plugins/worker.js')
  return new Promise((resolve, reject) => {
    worker.postMessage('getItems')
    worker.onmessage = event => {
      resolve(event.data)
    }
  })
}
