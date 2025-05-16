import {getStatus} from '../../../src/api/status/status'

describe('getStatus', () => {
  it('returns the correct host', () => {
    const host = 'example.com'
    const result = getStatus(host)
    expect(result.host).toBe(host)
  })
})
