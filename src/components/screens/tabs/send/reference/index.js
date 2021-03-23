import React from 'react';
import { View } from 'react-native';
import { TextEncoder } from 'text-encoding';
import { translate } from 'react-i18next';

import KeyboardAwareScrollView from '../../../../shared/toolBox/keyboardAwareScrollView';
import Input from '../../../../shared/toolBox/input';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { merge } from '../../../../../utilities/helpers';
import {
  deviceType,
  deviceHeight,
  SCREEN_HEIGHTS,
} from '../../../../../utilities/device';
import CircularProgress from './circularProgress';
import HeaderBackButton from '../../../router/headerBackButton';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;
const isAndroid = deviceType() === 'android';

class Reference extends React.Component {
  state = {
    reference: {
      value: '',
      validity: -1,
      wrapperStyle: {},
    },
  };

  validator = str => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  };

  componentDidMount() {
    const {
      navigation: { setOptions },
      prevStep,
      sharedData,
    } = this.props;

    if (sharedData.reference) {
      this.onChange(sharedData.reference);
    }

    setOptions({
      title: isSmallScreen ? 'Send' : 'Add a reference',
      headerLeft: props => <HeaderBackButton {...props} onPress={prevStep} safeArea={true} />,
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const {
        navigation: { setOptions },
      } = this.props;
      setOptions({
        title: isSmallScreen ? 'Send' : 'Add a reference',
      });
    }
  }

  onChange = value => {
    this.setState({
      reference: {
        value,
        validity: this.validator(value),
      },
    });
  };

  onSubmit = () => {
    const { reference } = this.state;
    const validity = this.validator(reference.value);

    if (validity === 0) {
      this.props.nextStep(
        merge(this.props.sharedData, {
          reference: reference.value,
        })
      );
    } else {
      this.setState({
        reference: merge(reference, { validity }),
      });
    }
  };

  render() {
    const { styles, t } = this.props;
    const {
      reference: { value, validity },
    } = this.state;
    const byteCount = encodeURI(value).split(/%..|./).length - 1;

    return (
      <View style={[styles.theme.wrapper, styles.wrapper]}>
        <KeyboardAwareScrollView
          viewIsInsideTab
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View style={styles.inputContainer}>
            <Input
              reference={el => {
                this.input = el;
              }}
              label={t('Message (optional)')}
              autoFocus={!isAndroid}
              autoCorrect={false}
              innerStyles={{
                input: styles.input,
                inputLabel: styles.theme.label,
              }}
              multiline={true}
              onChange={this.onChange}
              value={value}
              error={
                validity === 1
                  ? t('Maximum length of 64 bytes is exceeded.')
                  : ''
              }
            />
            <CircularProgress
              style={styles.circularProgress}
              max={64}
              value={byteCount}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Reference), getStyles());
