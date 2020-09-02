import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
})

export default async (req: Req, res: Res) => {
  pusher.trigger('my-channel', 'server-event', req.body)
  res.status(200).end()
}
