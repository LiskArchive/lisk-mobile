import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import { P, H1, Small } from '../../toolBox/typography';
import Input from '../../toolBox/input';
import Avatar from '../../avatar';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { accountFollowed as accountFollowedAction } from '../../../actions/accounts';

@connect(state => ({
  account: state.accounts.followed,
}), {
  accountFollowed: accountFollowedAction,
})
class AddToBookmark extends React.Component {
  state = {
    label: {
      value: '',
      validity: -1,
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
    this.setState({
      label: {
        value,
        // validity: this.validator(value),
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
      this.forward();
    } else {
      this.setState({
        label: { value, validity },
      });
    }
  }

  render() {
    const { styles } = this.props;
    const { label: { value, validity } } = this.state;
    const { address } = this.props.sharedData;
    const secondButton = <View style={[styles.linkWrapper, styles.row]}>
      <P style={[styles.link, styles.theme.link]} onPress={this.forward}>
        Don’t save and continue
      </P>
    </View>;
    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          disabled={validity === 1}
          onSubmit={this.saveAndContinue}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: 'Save and continue',
            type: 'inBox',
          }}
          extras={secondButton}
        >
          <View>
            <View style={styles.headerContainer}>
              <H1 style={[styles.header, styles.theme.header]}>
                AddToBookmark
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
                innerStyles={{ input: styles.input }}
                multiline={true}
                onChange={this.onChange}
                value={value}
                error={validity === 1 ? 'Label can\'t be empty.' : ''}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(AddToBookmark, getStyles());
