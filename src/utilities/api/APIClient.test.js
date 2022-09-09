import client from './APIClient'

jest.useRealTimers()

describe('APIClient', () => {
  it.skip('should work', (done) => {
    client.socket.on('hello', (arg) => {
      expect(arg).toBe('world')
      done()
    })
    client.socket.emit('hello', 'world')
  })

  it.skip('should work (with ack)', (done) => {
    client.socket.on('hi', (cb) => {
      cb('hola')
    })
    client.socket.emit('hi', (arg) => {
      expect(arg).toBe('hola')
      done()
    })
  })
})
