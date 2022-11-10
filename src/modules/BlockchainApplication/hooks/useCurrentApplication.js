import { useApplications } from '../context/ApplicationsContext';

export function useCurrentApplication() {
  const { currentApplication, setCurrentApplication } = useApplications();

  return [currentApplication, setCurrentApplication];
}
