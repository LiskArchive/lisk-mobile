import apiClient from 'utilities/api/APIClient';
import { useApplications } from '../context/ApplicationsContext';

/**
 * @typedef {object} Application - Lisk-based blockchain application (on-chain and off-chain data).
 * On-chain properties:
 * @property {string} name - App name.
 * @property {'registered' | 'active' | 'terminated'} state - State of the blockchain application.
 * @property {string} address - App address.
 * @property {number} lastCertificateHeight - Height of app last certificate.
 * @property {number} lastUpdated - Last update date of the app (in number format).
 * Off-chain properties:
 * @property {string} chainName - Chain name of the app.
 * @property {string} chainID - Chain ID of the app.
 * @property {string} title - App title.
 * @property {string} description - App description.
 * @property {'mainnet' | 'testnet' | 'betanet' | 'alphanet' | 'devnet'} networkType - Network for which the app metadata is to be queried.
 * @property {boolean} isDefault - If the app is default or not.
 * @property {string} genesisURL - URL where the app genesis block is stored.
 * @property {string} projectPage - App landing page.
 * @property {array<{http: string, ws: string}>} serviceURLs - App service URLs for interacting the their HTTP and WS APIs.
 * @property {object<{png: string, svg: string}>} logo - App logo resources.
 * @property {string} appPage - App office page.
 * @property {string} backgroundColor - App background color.
 * @property {array<{url: string, txnPage: string}>} explorers - App blockchain explores.
 * @property {array<{url: string, maintainer: string}>} appNodes - App nodes info.
 */

/**
 * @callback SetCurrentApplicationFunction - Handles a current application transition.
 * @param {Application} selectedApplication - The application to setup.
 * @returns {Application} - The newly set application.
 */

/**
 * Provides the current blockchain application the user is logged-in and a setup function for it.
 * @returns {[Application, SetCurrentApplicationFunction]} - Current application and setup function.
 */
export function useCurrentApplication() {
  const { currentApplication } = useApplications();

  const handleSetData = (selectedApplication) => {
    apiClient.create({
      ...selectedApplication.serviceURL,
      enableCertPinning: selectedApplication.chainName === 'lisk_mainchain',
    });

    currentApplication.setData(selectedApplication);

    return currentApplication.data;
  };

  return [currentApplication, handleSetData];
}
