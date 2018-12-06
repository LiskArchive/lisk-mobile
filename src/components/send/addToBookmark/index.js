import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, Small } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';
import {
  accountFollowed as accountFollowedAction,
} from '../../../actions/accounts';
import { deviceType } from '../../../utilities/device';

const isAndroid = deviceType() === 'android';
@connect(state => ({
  account: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
})
class AddToBookmark extends React.Component {
  state = {
    buttonTitle: 'Continue',
    label: {
      value: '',
      validity: -1,
    },
  };

  validator = str => (str.length > 30 ? 1 : 0)

  componentDidMount() {
    this.props.navigation.setParams({
      title: 'Add to bookmarks',
      showButtonLeft: true,
      action: () => this.props.prevStep(),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  onChange = (value) => {
    this.setState({
      buttonTitle: (value.length > 0) ? 'Save and continue' : 'Continue',
      label: {
        value,
        validity: this.validator(value),
      },
    });
  }

  forward = () => {
    this.props.move({
      to: 2,
    });
  }

  saveAndContinue = () => {
    const { value, validity } = this.state.label;
    if (validity !== 1) {
      if (value.length > 0) {
        const { accountFollowed, sharedData } = this.props;
        accountFollowed(sharedData.address, value);
      }
      this.forward();
    }
  }

  render() {
    const { styles } = this.props;
    const { label } = this.state;
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
              <P style={styles.theme.subHeader}>
                Optional: Add a label to save the address for the future use.
              </P>
            </View>
            <View>
              <View style={styles.row}>
                <P style={[styles.label, styles.theme.label]}>Address</P>
                <View style={styles.addressContainer}>
                  <Avatar address={address || ''} style={styles.avatar} size={35}/>
                  <Small style={[styles.address, styles.text, styles.theme.text]}>{address}</Small>
                </View>
              </View>
              <Input
                reference={(el) => { this.input = el; }}
                label='Label'
                autoFocus={!isAndroid}
                autoCorrect={false}
                innerStyles={{ input: styles.input }}
                multiline={true}
                onChange={this.onChange}
                error={
                  label.validity === 1 ?
                    'The label must be shorter than 20 characters.' : ''
                }
                value={label.value}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(AddToBookmark, getStyles());
