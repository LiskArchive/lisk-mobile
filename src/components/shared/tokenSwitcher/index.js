import React from 'react';
import { useSelector } from 'react-redux';
import withTheme from 'components/shared/withTheme';
import { IconButton } from 'components/shared/toolBox/button';
import { tokenKeys, tokenMap } from 'constants/tokens';
import { colors } from 'constants/styleGuide';
import ModalHolder from 'utilities/modal';
import { deviceType } from 'utilities/device';
import AssetSelection from './assetSelection';
import getStyles from './styles';

const onClick = () => {
  ModalHolder.open({ title: 'Your assets', component: AssetSelection });
};

const TokenSwitcher = ({ styles, theme, safeArea }) => {
  const { token } = useSelector((state) => state.settings);
  const os = deviceType();

  const style =
    token.active === tokenKeys[0]
      ? { backgroundColor: colors[theme].ultramarineBlue }
      : { backgroundColor: colors[theme].BTC };
  const profiles = tokenKeys.filter((key) => token.list[key]);

  return profiles.length > 1 ? (
    <IconButton
      color={colors[theme].white}
      iconSize={14}
      icon={tokenMap[token.active].icon}
      onClick={onClick}
      style={[styles.button, style, safeArea ? styles[os] : null]}
    />
  ) : null;
};

export default withTheme(TokenSwitcher, getStyles());
