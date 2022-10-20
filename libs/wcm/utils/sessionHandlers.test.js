import wallets from 'tests/constants/wallets';
import { signClient } from './connectionCreator';
import { onApprove, onReject } from './sessionHandlers';
import { PAIRING_PROPOSAL_STATUS, ERROR_CASES } from '../constants/lifeCycle';

jest.mock('@walletconnect/utils', () => ({
  getSdkError: jest.fn((str) => str),
}));

jest.mock('@libs/wcm/utils/connectionCreator', () => ({
  signClient: {
    approve: jest.fn().mockImplementation(() =>
      Promise.resolve({
        acknowledged: jest.fn(),
      })
    ),
    reject: jest.fn().mockImplementation(() => Promise.resolve({})),
  },
}));

describe('sessionHandlers', () => {
  const proposal = {
    params: {
      requiredNamespaces: [],
      relays: [{ protocol: 'LSK' }],
    },
    id: 'sample_id',
  };
  const selectedAccounts = [wallets.genesis.summary.address, wallets.delegate.summary.address];

  describe('onApprove', () => {
    it('Should signClient.approve with correct arguments', async () => {
      const res = await onApprove(proposal, selectedAccounts);
      expect(signClient.approve).toHaveBeenCalledWith({
        id: proposal.id,
        namespaces: {},
        relayProtocol: proposal.params.relays[0].protocol,
      });
      expect(res).toEqual(PAIRING_PROPOSAL_STATUS.SUCCESS);
    });

    it('Should throw error if selectedAccounts is not a list of addresses', async () => {
      signClient.approve.mockImplementation(() =>
        Promise.reject(new Error('Accounts are invalid'))
      );
      const res = await onApprove(proposal, []);
      expect(res).toEqual(PAIRING_PROPOSAL_STATUS.ERROR);
    });
  });

  describe('onReject', () => {
    it('Should signClient.approve with correct arguments', async () => {
      await onReject(proposal);

      expect(signClient.reject).toHaveBeenCalledWith({
        id: proposal.id,
        reason: ERROR_CASES.USER_REJECTED_METHODS,
      });
    });
  });
});
