import React from 'react';
import { View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import withTheme from 'components/shared/withTheme';
import { P } from 'components/shared/toolBox/typography';
import { deviceType } from 'utilities/device';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';

import getBlockchainApplicationsListStyles from './styles';

function BlockchainApplicationsList({ styles }) {
	const { applications } = useBlockchainApplicationManagement();

	const extraHeight = deviceType() === 'android' ? 170 : 0;

	return (
		<View style={[styles.wrapper, styles.theme.wrapper]}>
			<KeyboardAwareScrollView
				viewIsInsideTab
				enableOnAndroid={true}
				enableResetScrollToCoords={false}
				extraHeight={extraHeight}
			>
				<View style={[styles.innerContainer, styles.theme.innerContainer]}>
					<View style={styles.searchContainer}>
						<P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
							Search for apps...
						</P>
					</View>

					<View style={styles.body}>
						{applications.isLoading ? (
							<P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
								Loading apps...
							</P>
						) : (
							applications.data.map((application, index) => (
								<View
									key={application.chainID}
									style={{
										...styles.applicationContainer,
										paddingTop: index === 0 ? 0 : 16,
									}}
								>
									<Image
										source={{ uri: application.images.logo.png }}
										style={{ ...styles.applicationLogoImage }}
									/>

									<P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
										{application.name}
									</P>
								</View>
							))
						)}
					</View>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

export default withTheme(BlockchainApplicationsList, getBlockchainApplicationsListStyles());
