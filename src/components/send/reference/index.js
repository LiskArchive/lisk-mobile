import React from 'react';
import { View } from 'react-native';
import { TextEncoder } from 'text-encoding';
import { translate } from 'react-i18next';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { merge } from '../../../utilities/helpers';
import { deviceType, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import DropDownHolder from '../../../utilities/alert';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const isAndroid = deviceType() === 'android';

class Reference extends React.Component {
  state = {
    reference: {
      value: '',
      validity: -1,
    },
  };

  validator = (str) => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  }

  componentDidMount() {
    const {
      navigation: { setParams }, prevStep, sharedData,
    } = this.props;

    if (sharedData.reference) {
      this.onChange(sharedData.reference);
    }

    setParams({
      title: isSmallScreen ? 'Send' : 'Add a reference',
      showButtonLeft: true,
      action: () => prevStep(),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const { navigation: { setParams } } = this.props;
      setParams({
        title: isSmallScreen ? 'Send' : 'Add a reference',
      });
    }
  }

  onChange = (value) => {
    this.setState({
      reference: {
        value,
        validity: this.validator(value),
      },
    });
  }

  onSubmit = () => {
    const { t, sharedData, nextStep } = this.props;
    const { reference } = this.state;
    const validity = this.validator(reference.value);

    if (validity === 0) {
      DropDownHolder.closeAlert();

      return nextStep(merge(sharedData, {
        reference: reference.value,
      }));
    }

    DropDownHolder.error(t('Error'), t('Maximum length of 64 bytes is exceeded.'));

    return this.setState({
      reference: merge(reference, { validity }),
    });
  }

  render() {
    const { styles, t } = this.props;
    const { reference: { value } } = this.state;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View>
            {!isSmallScreen ? (
              <View style={styles.headerContainer}>
                <P style={styles.theme.subHeader}>
                  {t('Add a reference to this transaction.')}
                </P>
              </View>
            ) : null}

            <Input
              reference={(el) => { this.input = el; }}
              label={t('Reference (optional)')}
              autoFocus={!isAndroid}
              autoCorrect={false}
              innerStyles={{ input: styles.input }}
              multiline={true}
              onChange={this.onChange}
              value={value}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Reference), getStyles());
