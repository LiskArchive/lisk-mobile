export default function getSliderPaginationStyles() {
  return {
    common: {
      container: {
        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
      },
    },
  };
}
