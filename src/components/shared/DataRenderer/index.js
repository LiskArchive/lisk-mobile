/* eslint-disable max-statements */
import React from 'react';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';

import getDataRendererStyles from './styles';

/**
 * Allows to render API fetched data handling its different states: loading, error,
 * success and empty.
 * @param {Object} props.data - The data that wants to be rendered.
 * @param {Boolean} props.isLoading - Flag that indicates if the data is
 * being or not fetched from the API request.
 * @param {Error} props.error - Error of the API request, if any.
 * @param {React.ReactNode} props.children - ReactNative children tto render when data is fetched (Optional).
 * @param {Function} props.renderData - Callback invoked when data is fetched (Optional). Passes down
 * the ready-to-render data as render prop.
 * @param {Function} props.renderLoading - Callback invoked when data is loading (Optional).
 * @param {Function} props.renderError - Callback invoked when data failed fetching (Optional).
 * @param {Function} props.renderEmpty - Callback invoked when request succeed, but no data is
 * available to show (Optional).
 * @param {Boolean} props.hideOnEmpty - Flag that hides the empty state rendering when no
 * data is available.
 * @param {Object} props.style - Styles to add to default render returns (Optional).
 * @param {React.CSSProperties} props.style.loading - Styles for the default loading fallback component (Optional).
 * @param {React.CSSProperties} props.style.error - Styles for the default error fallback component (Optional).
 * @param {React.CSSProperties} props.style.empty - Styles for the default empty fallback component (Optional).
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
  const { styles } = useTheme({ styles: getDataRendererStyles() });

  // TODO: Add Skeleton when component is available
  // (details on https://github.com/LiskHQ/lisk-mobile/issues/1592).
  if (isLoading) {
    return renderLoading ? (
      renderLoading()
    ) : (
      <P style={[styles.text, styles.theme.text, style?.loading]}>Loading...</P>
    );
  }

  // TODO: Add Error Fallback component when is available.
  // (details on https://github.com/LiskHQ/lisk-mobile/issues/1593).
  if (error) {
    return renderError ? (
      renderError(error)
    ) : (
      <P style={[styles.errorText, styles.theme.errorText, style?.error]}>Error!</P>
    );
  }

  if (Array.isArray(data) ? !data.length : !data) {
    if (hideOnEmpty) return null;

    if (renderEmpty) return renderEmpty();

    return <P style={[styles.text, styles.theme.text, style?.empty]}>No data available</P>;
  }

  return renderData ? renderData(data) : children;
}
