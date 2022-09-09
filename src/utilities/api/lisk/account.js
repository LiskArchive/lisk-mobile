import * as Lisk from '@liskhq/lisk-client'
import { apiClient } from './apiClient'

export const getSummary = (params) => apiClient.getAccount(params.address)

export const extractAddress = (passphrase) =>
  Lisk.cryptography.address.getLisk32AddressFromPassphrase(passphrase)

export const extractPublicKey = (passphrase) =>
  Lisk.cryptography.ed.getKeys(passphrase).publicKey.toString('hex')
