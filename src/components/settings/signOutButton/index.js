import React from 'react';
import { translate } from 'react-i18next';
import { IconButton } from '../../toolBox/button';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../withTheme';
import getStyles from './styles';

const SignOutButton = ({
  onClick, theme, styles, t,
}) => (
  <IconButton
    icon='logout'
    iconSize={18}
    title={t('Sign out')}
    color={colors[theme].blue}
    onClick={onClick}
    titleStyle={[styles.title, styles.theme.title]}
    style={styles.button}
  />
);

export default withTheme(translate()(SignOutButton), getStyles());
