import {Router, Request, Response} from 'express'
import {getStatus} from './status'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const host = req.get('Host') ?? ''
  res.json(getStatus(host))
})

export default router
