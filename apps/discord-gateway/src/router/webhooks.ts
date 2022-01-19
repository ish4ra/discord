import { Request, Response } from 'express'
import WebhooksApi from '../api/webhooks-api'
import WebhooksData from '../data/webhooks-data'
import { MAGICNUMBER_BAD_GATEWAY, MAGICNUMBER_MISSING_PERMISSIONS } from '../lib/magic-number'


export async function getWebhooks(req: Request, res: Response) {
  const channel = req.params.channel
  if (!channel)
    return void res.status(400).end()

  const webhooks = await WebhooksData.findWebhooks(channel, Object.keys(req.query))

  if (!webhooks)
    return void res.status(404).end()

  if (webhooks === MAGICNUMBER_BAD_GATEWAY)
    return void res.status(502).end()

  if (webhooks === MAGICNUMBER_MISSING_PERMISSIONS)
    return void res.status(403).end()

  res.status(200).send(webhooks)
}

export async function postWebhook(req: Request, res: Response) {
  const channel = req.params.channel
  if (!channel)
    return void res.status(400).end()

  const webhook = await WebhooksApi.createWebhook(channel)

  if (!webhook)
    return void res.status(404).end()

  if (webhook === MAGICNUMBER_BAD_GATEWAY)
    return void res.status(502).end()

  if (webhook === MAGICNUMBER_MISSING_PERMISSIONS)
    return void res.status(403).end()

  res.status(200).send(webhook)
}
