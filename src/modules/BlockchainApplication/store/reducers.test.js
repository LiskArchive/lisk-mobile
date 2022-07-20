import { BLOCKCHAIN_APPLICATIONS_MOCK, MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK } from '../mocks'
import actionTypes from './actionTypes'
import { pins, applications, current } from './reducers'

describe('BlockchainApplication reducers', () => {
  describe('pins', () => {
    it('Should return list of chainIds', async () => {
      const actionData = {
        type: actionTypes.toggleApplicationPin,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID,
      }

      expect(pins([], actionData)).toContain(actionData.chainId)
    })

    it('Should return list of chainIds without the removed one', () => {
      const actionData = {
        type: actionTypes.toggleApplicationPin,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID,
      }

      expect(pins([BLOCKCHAIN_APPLICATIONS_MOCK[0].chainID], actionData)).not.toContain(
        actionData.data
      )
    })
  })

  describe('applications', () => {
    it('Should return list of applications with newly added application', () => {
      const newApplication = {
        name: 'New app',
        chainID: 'aq02qkbb35u4jdq2szo6ytre',
        state: 'active',
        serviceURLs: ['https://service.newapp.com'],
        lastUpdated: 789456123,
      }
      const actionData = {
        type: actionTypes.addApplicationByChainId,
        application: newApplication,
      }
      const changedState = applications(MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK, actionData)

      expect(changedState).toHaveProperty(newApplication.chainID, newApplication)
    })

    it('Should return list of applications without the removed one', () => {
      const actionData = {
        type: actionTypes.deleteApplicationByChainId,
        chainId: BLOCKCHAIN_APPLICATIONS_MOCK[1].chainID,
      }
      const changedState = applications(MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK, actionData)

      expect(changedState).not.toHaveProperty(actionData.chainId)
    })
  })

  describe('current', () => {
    it('Should return current application if setCurrentApplication action type is triggered', () => {
      const actionData = {
        type: actionTypes.setCurrentApplication,
        application: BLOCKCHAIN_APPLICATIONS_MOCK[0],
      }
      expect(current({}, actionData)).toEqual(BLOCKCHAIN_APPLICATIONS_MOCK[0])
    })
  })
})
