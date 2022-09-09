import modalHolder from './modal'

describe('modalHolder Handler', () => {
  const modalMock = {
    open: jest.fn(),
    close: jest.fn(),
  }
  const update = jest.fn()
  const config = {
    title: 'title text',
    component: 'modal',
    callback: () => true,
  }

  it('modalHolder.close should call the close function of the passing modal ', () => {
    modalHolder.initialize(modalMock, update)
    modalHolder.close()
    expect(modalMock.close).toBeCalled()
  })

  it('modalHolder.open should call the open function of the passing modal ', () => {
    modalHolder.initialize(modalMock, update)
    modalHolder.open(config)
    expect(update).toBeCalledWith(config)
    expect(modalMock.open).toBeCalled()
  })
})
