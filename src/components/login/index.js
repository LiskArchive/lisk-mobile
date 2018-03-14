import { connect } from 'react-redux';
import Login from './login';
import { accountSaved, accountLoggedIn } from '../../actions/accounts';

/**
 * Using react-redux connect to pass state and dispatch to Login
 */
const mapStateToProps = state => ({
  peers: state.peers,
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
  accountLoggedIn: data => dispatch(accountLoggedIn(data)),
  accountSaved: () => dispatch(accountSaved()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
