import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import Pusher from 'pusher'
import wait from '@sharyn/util/wait'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
})

export default async (req: Req, res: Res) => {
  console.log(req.body)
  pusher.trigger('my-channel', 'server-event', req.body)
  console.log('sent to pusher')
  await wait(2000)
  res.status(200).end()
}
