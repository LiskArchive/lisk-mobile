import apiClient from 'utilities/api/APIClient';
import { useApplications } from '../context/ApplicationsContext';

export function useCurrentApplication() {
  const { currentApplication } = useApplications();

  const handleSetData = (selectedApplication) => {
    apiClient.create(selectedApplication.serviceURL);

    currentApplication.setData(selectedApplication);
  };

  return [currentApplication, handleSetData];
}
