import React from 'react';
import { View, ScrollView } from 'react-native';
import { translate } from 'react-i18next';
import { H1 } from '../toolBox/typography';
import { SecondaryButton } from '../toolBox/button';
import withTheme from '../withTheme';
import getStyles from './styles';

class Modal extends React.Component {
  closeModal = () => {
    this.props.navigation.pop();
  }
  // this.props.navigation.navigate('Modal', { title: 'yashar', component: About });
  render() {
    const {
      t, styles, navigation,
    } = this.props;
    const title = navigation.getParam('title', 'Bio Auth');
    const Component = navigation.getParam('component');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <ScrollView>
            <View>
            <H1>{title}</H1>
            <Component />
            </View>

            <View>
              <SecondaryButton
                onClick={this.closeModal}
                title={t('Close')}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(Modal), getStyles());
