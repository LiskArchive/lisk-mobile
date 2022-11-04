import React from 'react';
import { P } from 'components/shared/toolBox/typography';

/**
 * Allows to render API fetched data handling its different
 * states: loading, error, success and empty.
 * @param {*} data - The data that wants to be rendered.
 * @param {Boolean} isLoading - Flag that indicates if the data is
 * being or not fetched from the API request.
 * @param {Object} error - Error of the API request, if any.
 * @param {Object} children - ReactNative children tto render when data is fetched (Optional).
 * @param {Function} renderData - Callback invoked when data is fetched (Optional). Passes down
 * the ready-to-render data as render prop.
 * @param {Function} renderLoading - Callback invoked when data is loading (Optional).
 * @param {Function} renderError - Callback invoked when data failed fetching (Optional).
 * @param {Function} renderEmpty - Callback invoked when request succeed, but no data is
 * available to show (Optional).
 * @param {Boolean} hideOnEmpty - Flag that hides the empty state rendering when no
 * data is available.
 * @param {Object} style - Styles to add to default render returns (Optional).
 * @param {Object} style.loading - Styles for the default loading fallback component (Optional).
 * @param {Object} style.error - Styles for the default error fallback component (Optional).
 * @param {Object} style.empty - Styles for the default empty fallback component (Optional).
 */
export default function DataRenderer({
  data,
  isLoading,
  error,
  children,
  renderData,
  renderLoading,
  renderError,
  renderEmpty,
  hideOnEmpty,
  style,
}) {
  // TODO: Add Skeleton or Loader when component is available.
  if (isLoading) {
    return renderLoading ? renderLoading() : <P style={style?.loading}>Loading...</P>;
  }

  // TODO: Add Error general component when component is available.
  if (error) {
    return renderError ? renderError(error) : <P style={style?.error}>Error!</P>;
  }

  if (Array.isArray(data) ? !data.length : !data) {
    if (hideOnEmpty) return null;

    if (renderEmpty) return renderEmpty();

    return <P style={style?.empty}>No data available</P>;
  }

  return renderData ? renderData(data) : children;
}
