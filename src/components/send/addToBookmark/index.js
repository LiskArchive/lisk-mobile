import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, H1, Small } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';
import {
  accountFollowed as accountFollowedAction,
} from '../../../actions/accounts';

@connect(state => ({
  account: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
})
class AddToBookmark extends React.Component {
  state = {
    buttonTitle: 'continue',
    label: {
      value: '',
    },
  };

  validator = str => (str.length > 0 ? 0 : 1)

  componentDidMount() {
    this.props.navigation.setParams({
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });
  }

  onChange = (value) => {
    const validity = this.validator(value);
    this.setState({
      buttonTitle: (validity === 0) ? 'Save and continue' : 'Continue',
      label: {
        value,
      },
    });
  }

  forward = () => {
    this.props.move({
      to: 2,
    });
  }

  saveAndContinue = () => {
    const { value } = this.state.label;
    const validity = this.validator(value);
    if (validity === 0) {
      const { accountFollowed, sharedData } = this.props;
      accountFollowed(sharedData.address, value);
    }
    this.forward();
  }

  render() {
    const { styles } = this.props;
    const { label: { value } } = this.state;
    const { address } = this.props.sharedData;
    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.saveAndContinue}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: this.state.buttonTitle,
            type: 'inBox',
          }}
        >
          <View>
            <View style={styles.headerContainer}>
              <H1 style={[styles.header, styles.theme.header]}>
                Add to bookmark
              </H1>
              <P style={[styles.subHeader, styles.theme.subHeader]}>
                Optional: save for the future use.
              </P>
            </View>
            <View style={[styles.form, styles.theme.form]}>
              <View style={styles.row}>
                <P style={[styles.label, styles.theme.label]}>Address</P>
                <View style={styles.addressContainer}>
                  <Avatar address={address || ''} style={styles.avatar} size={35}/>
                  <Small style={[styles.address, styles.text, styles.theme.text]}>{address}</Small>
                </View>
              </View>
              <Input
                label='Label'
                autoCorrect={false}
                autoFocus={true}
                innerStyles={{ input: styles.input }}
                multiline={true}
                onChange={this.onChange}
                value={value}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(AddToBookmark, getStyles());
