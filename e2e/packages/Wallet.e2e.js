import { device, element, by } from 'detox'
import testConstants from '../utils/testConstants'

describe('Wallet Screen', () => {
  beforeAll(async () => {
    await device.launchApp()
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('sliderButton')).tap()
    await element(by.id('continueButton')).tap()
  })

  it('should navigate to wallet screen', async () => {
    await element(by.id('signInPassphraseInput')).atIndex(1).tap()
    await element(by.id('signInPassphraseInput')).atIndex(1).replaceText(testConstants.account)
    await element(by.id('signInButton')).atIndex(1).tap()
    await element(by.text('Got it')).tap()
    await element(by.id('transaction-item')).atIndex(0).tap()
    await element(by.id('recipient')).tap()
    await expect(element(by.id('wallet-screen'))).toExist()
  })

  it('should render wallet details', async () => {
    await expect(element(by.text('Account Details'))).toExist()
    await expect(element(by.text('Balance'))).toExist()
  })

  it('should navigate to send screen with prefilled wallet address', async () => {
    await element(by.text('Send LSK')).tap()
    await expect(element(by.id('recipient-screen'))).toExist()
    // TODO: Fix detox test for input to have text
    // Would test if submit button moves to next screen instead till this is fixed
    // await expect(element(by.id('recipient-input'))).toHaveText();
    await element(by.id('submit')).tap()
    await expect(element(by.id('amount-screen'))).toExist()
  })
})
