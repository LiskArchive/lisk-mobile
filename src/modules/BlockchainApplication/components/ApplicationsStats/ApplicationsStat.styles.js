import { themes, colors, boxes, fonts } from 'constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      width: '100%',
    },
    title: {
      color: colors.light.zodiacBlue,
    },
    chartContainer: {
      marginVertical: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    legendAmount: {
      fontFamily: fonts.family.contextSemiBold,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    legendIcon: {
      width: 16,
      height: 16,
      backgroundColor: colors.light.ultramarineBlue,
      borderRadius: 8,
      marginRight: 8,
    },
    registeredIcon: {
      backgroundColor: colors.light.ultramarineBlue,
    },
    activatedIcon: {
      backgroundColor: colors.light.ufoGreen,
    },
    terminatedIcon: {
      backgroundColor: colors.light.zodiacBlue,
    },
    flex: {
      flex: 1,
    },
    card: {
      borderRadius: 16,
      backgroundColor: colors.light.ultramarineBlue,
      padding: boxes.boxPadding,
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardTitle: {
      fontFamily: fonts.family.context,
      fontSize: fonts.size.base,
      color: colors.light.white,
    },
    amount: {
      paddingVertical: 4,
      fontSize: fonts.size.h4,
      color: colors.light.white,
      letterSpacing: 1,
    },
    staked: {
      backgroundColor: colors.light.yellowCopacabana,
    },
    blackText: {
      color: colors.light.zodiacBlue,
    },
    legendLabel: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.light]: {
    title: {
      color: colors.light.zodiacBlue,
    },
    legendLabel: {
      color: colors.light.zodiacBlue,
    },
  },
  [themes.dark]: {
    title: {
      color: colors.dark.white,
    },
    legendLabel: {
      color: colors.dark.white,
    },
  },
});
