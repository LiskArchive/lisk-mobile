export default function getSliderPaginationStyles() {
  return {
    common: {
      container: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dot: {
        width: 12,
        height: 8,
        borderRadius: 6,
        marginHorizontal: 3,
      },
    },
  };
}
