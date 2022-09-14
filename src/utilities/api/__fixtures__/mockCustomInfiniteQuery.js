export const mockCustomInfiniteQueryData = [...new Array(50)].map((_, index) => ({ id: index }));

export const mockCustomInfiniteQuery = {
  data: mockCustomInfiniteQueryData,
  meta: {
    count: 2,
    offset: 0,
    total: mockCustomInfiniteQueryData.length,
  },
};
