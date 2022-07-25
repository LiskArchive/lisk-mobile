import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import ApplicationDetailComponent from '../components/ApplicationDetail';
import getAddApplicationStyles from './styles';
import { useBlockchainApplicationManagement } from '../hooks/useBlockchainApplicationManagement';

const ApplicationDetail = ({ route }) => {
  const { styles } = useTheme({ styles: getAddApplicationStyles() });
  const { applications } = useBlockchainApplicationManagement();

  const chainID = route.params.chainID;

  const application = useMemo(
    () => applications?.data.filter((app) => app.chainID === chainID),
    [chainID, applications]
  )[0];

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <ApplicationDetailComponent
        {...application}
        image={application.images.logo.png}
        variant="manage"
      />
    </View>
  );
};

export default ApplicationDetail;
