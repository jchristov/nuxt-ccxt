import {Router} from 'express'

import ccxt from './ccxt'

const router = Router()

router.use(ccxt)

router.get('/', (req, res) => {
  res.json({data: 'ok'})
})

export default router
