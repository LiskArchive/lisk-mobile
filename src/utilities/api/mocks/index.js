export const CUSTOM_INFINITE_QUERY_DATA = [...new Array(50)].map((_, index) => (
  { id: index }
));

export const CUSTOM_INFINITE_QUERY_MOCK = {
  data: CUSTOM_INFINITE_QUERY_DATA,
  meta: {
    count: 2,
    offset: 0,
    total: CUSTOM_INFINITE_QUERY_DATA.length,
  },
};
