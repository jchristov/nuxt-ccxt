import {Router} from 'express'

import users from './users'
import ccxt from './ccxt'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(ccxt)

export default router
