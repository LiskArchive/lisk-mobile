import React from 'react';
import { View } from 'react-native';
import { TextEncoder } from 'text-encoding';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, H1 } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import withTheme from '../../withTheme';
import getStyles from './styles';

class Reference extends React.Component {
  state = {
    reference: {
      value: '',
      validity: -1,
    },
  };

  validate = (str) => {
    const uint8array = new TextEncoder().encode(str);
    return uint8array.length > 64 ? 1 : 0;
  }

  componentDidMount() {
    // will be working after #379
    const initialValue = (
      this.props.prevState.reference || ((this.props.initialData || {}).reference)
    );

    if (initialValue) {
      this.onChange(initialValue);
    }
  }

  onChange = (value) => {
    this.setState({
      reference: {
        value,
        validity: this.validate(value),
      },
    });
  }

  onSubmit = () => {
    this.props.move({
      to: 5,
      stepData: {
        reference: this.state.reference.value,
      },
    });
  }

  render() {
    const { styles } = this.props;
    const { reference: { value, validity } } = this.state;

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          disabled={validity !== 0}
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
                error={validity === 1 ? 'Maximum length of 64 characters is exceeded.' : ''}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(Reference, getStyles());
