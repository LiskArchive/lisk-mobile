import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default function getBlockchainApplicationsListStyles() {
	return {
		common: {
			wrapper: {
				height: '100%',
			},
			innerContainer: {
				flexDirection: 'column',
				flex: 1,
			},
			subHeader: {
				flexDirection: 'column',
				paddingTop: boxes.boxPadding,
				paddingLeft: boxes.boxPadding,
				paddingRight: boxes.boxPadding,
				paddingBottom: 40,
			},
			body: {
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				padding: boxes.boxPadding,
			},
			applicationNameLabel: {
				fontSize: fonts.size.base,
				maxWidth: '90%',
				marginRight: 15,
			},
		},
		[themes.light]: {
			wrapper: {
				backgroundColor: colors.light.white,
			},
			innerContainer: {
				backgroundColor: colors.light.white,
			},
			applicationNameLabel: {
				color: colors.light.slateGray,
			},
		},

		[themes.dark]: {
			wrapper: {
				backgroundColor: colors.dark.mainBg,
			},
			innerContainer: {
				backgroundColor: colors.dark.mainBg,
			},
			applicationNameLabel: {
				color: colors.light.platinum,
			},
		},
	};
}
