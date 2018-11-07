import { colors } from '../../constants/styleGuide';

export default () => ({
  common: {
    container: {
      flex: 1,
      backgroundColor: colors.light.white,
      padding: 20,
    },
    group: {
      marginTop: 20,
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: colors.light.grayScale5,
      paddingTop: 16,
      paddingBottom: 6,
    },
    itemTitle: {
      flexDirection: 'row',
      width: '100%',
      height: 36,
      paddingTop: 6,
      paddingBottom: 6,
    },
    itemName: {
      flex: 1,
      height: 24,
    },
    itemNameText: {
      color: colors.light.grayScale1,
      lineHeight: 20,
    },
    itemIcon: {
      width: 26,
      height: 20,
      paddingRight: 2,
    },
    itemArrow: {
      width: 44,
      height: 24,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
});
