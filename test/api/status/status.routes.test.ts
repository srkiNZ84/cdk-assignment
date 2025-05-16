import request from 'supertest'
import express from 'express'
import statusRouter from '../../../src/api/status/status.routes'

const app = express().use('/status', statusRouter)

it('returns 200', async () => {
  const {status} = await request(app).get('/status')

  expect(status).toBe(200)
})

it('returns the host from the Host header', async () => {
  const {body} = await request(app).get('/status').set('Host', 'example.com')

  expect(body.host).toBe('example.com')
})
