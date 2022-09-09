import { device, element, by } from 'detox'
import testConstants from '../utils/testConstants'

describe('Settings Screen', () => {
  beforeAll(async () => {
    await device.launchApp()
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('intro-screen')).swipe('left')
    await element(by.id('sliderButton')).tap()
    await element(by.id('continueButton')).tap()
  })

  it('should load settings screen', async () => {
    await element(by.id('signInPassphraseInput')).atIndex(1).tap()
    await element(by.id('signInPassphraseInput')).atIndex(1).replaceText(testConstants.account)
    await element(by.id('signInButton')).atIndex(1).tap()
    await element(by.text('Got it')).tap()
    await element(by.text('Settings')).tap()
    await expect(element(by.text('Security'))).toBeVisible()
  })
  it('should toggle discrete mode', async () => {
    await element(by.text('Home')).tap()
    await expect(element(by.id('token-balance'))).toBeVisible()
    await element(by.text('Settings')).tap()
    await element(by.id('enable-incognito-target')).atIndex(0).tap()
    await element(by.text('Home')).tap()
    await expect(element(by.id('amount-blur'))).toBeVisible()
  })

  // it('should toggle dark/light mode', async () => {
  //   await element(by.text('Settings')).tap();
  //   await element(by.id('dark-mode-target')).tap();
  // });

  it('should change currency for conversion', async () => {
    await element(by.text('Settings')).tap()
    await element(by.text('Currency')).tap()
    await element(by.text('CHF')).tap()
    await element(by.id('header-left-icon')).tap()
    await element(by.text('Send')).tap()
    await element(by.id('recipient-input')).replaceText('lskh358ygvdyvu3wzghrqk4g4dhvurjokyocysjrq')
    await element(by.id('submit')).tap()
    await expect(element(by.id('currency-amount'))).toHaveText('~ 0 CHF')
  })

  // it('should open about Lisk', async () => {

  // })

  // it('should open Terms of use', async () => {

  // })

  // it('should sign out', async () => {

  // })
})
