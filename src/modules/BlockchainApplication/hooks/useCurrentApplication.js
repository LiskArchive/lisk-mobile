import { useApplications } from '../context/ApplicationsContext';

export function useCurrentApplication() {
  const { currentApplication } = useApplications();

  return [currentApplication, currentApplication.setData];
}
