import React from 'react';
import { View } from 'react-native';
import { TextEncoder } from 'text-encoding';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, H1 } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { merge } from '../../../utilities/helpers';

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
    const { sharedData } = this.props;

    if (sharedData.reference) {
      this.onChange(sharedData.reference);
    }

    this.props.navigation.setParams({
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });
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
    this.props.move({
      to: this.props.account.secondPublicKey ? 4 : 5,
      data: merge(this.props.sharedData, {
        reference: this.state.reference.value,
      }),
    });
  }

  render() {
    const { styles } = this.props;
    const { reference: { value, validity } } = this.state;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          disabled={validity === 1}
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: 'Continue',
            type: 'inBox',
          }}
        >
          <View>
            <View style={styles.headerContainer}>
              <H1 style={[styles.header, styles.theme.header]}>
                Reference
              </H1>
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Add a reference to this transaction.
              </P>
            </View>

            <View style={[styles.form, styles.theme.form]}>
              <Input
                label='Reference (Optional)'
                autoCorrect={false}
                innerStyles={{ input: styles.input }}
                multiline={true}
                onChange={this.onChange}
                value={value}
                error={validity === 1 ? 'Maximum length of 64 bytes is exceeded.' : ''}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Reference, getStyles());
