import React from 'react';
import { View } from 'react-native';
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

  validator = str => (
    encodeURI(str).split(/%..|./).length - 1 > 64 ? 1 : 0
  );

  componentDidMount() {
    const {
      navigation: { setParams },
      prevStep,
      sharedData,
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
      const {
        navigation: { setParams },
      } = this.props;
      setParams({
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
