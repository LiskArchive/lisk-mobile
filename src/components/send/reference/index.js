import React from 'react';
import { View } from 'react-native';
import { TextEncoder } from 'text-encoding';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { merge } from '../../../utilities/helpers';
import { deviceType, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';

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
    const { navigation, prevStep, sharedData } = this.props;

    if (sharedData.reference) {
      this.onChange(sharedData.reference);
    }

    navigation.setParams({
      title: isSmallScreen ? 'Add a reference' : 'Send',
      showButtonLeft: true,
      action: () => prevStep(),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
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
    const { reference } = this.state;
    const validity = this.validator(reference.value);

    if (validity === 0) {
      this.props.nextStep(merge(this.props.sharedData, {
        reference: reference.value,
      }));
    } else {
      this.setState({
        reference: merge(reference, { validity }),
      });
    }
  }

  render() {
    const { styles } = this.props;
    const { reference: { value, validity } } = this.state;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}
        >
          <View>
            {!isSmallScreen ? (
              <View style={styles.headerContainer}>
                <P style={styles.theme.subHeader}>
                  Add a reference to this transaction.
                </P>
              </View>
            ) : null}

            <Input
              reference={(el) => { this.input = el; }}
              label='Reference (Optional)'
              autoFocus={!isAndroid}
              autoCorrect={false}
              innerStyles={{ input: styles.input }}
              multiline={true}
              onChange={this.onChange}
              value={value}
              error={validity === 1 ? 'Maximum length of 64 bytes is exceeded.' : ''}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Reference, getStyles());
