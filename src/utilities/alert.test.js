import dropDownHolder from './alert'

describe('dropDownHolder Handler', () => {
  const dropDownMock = {
    alertWithType: jest.fn(),
    close: jest.fn(),
  }
  const type = 'error'
  const title = 'title text'
  const message = 'message text'

  it('dropDownHolder.closeAlert should call the close function of the passing dropDown ', () => {
    dropDownHolder.initialize(dropDownMock)
    dropDownHolder.closeAlert()
    expect(dropDownMock.close).toBeCalled()
  })

  it('dropDownHolder.alert should call the alertWithType function of the passing dropDown ', () => {
    dropDownHolder.initialize(dropDownMock)
    dropDownHolder.alert(type, title, message)
    expect(dropDownMock.alertWithType).toBeCalledWith(type, title, message)
  })

  it('dropDownHolder.error should call the alertWithType function of the passing dropDown with an error type', () => {
    dropDownHolder.initialize(dropDownMock)
    dropDownHolder.error(title, message)
    expect(dropDownMock.alertWithType).toBeCalledWith(type, title, message)
  })
})
