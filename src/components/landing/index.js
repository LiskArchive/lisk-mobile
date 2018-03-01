import { connect } from 'react-redux';
import Landing from './landing';
import { activePeerSet } from '../../actions/peers';
import { accountsRetrieved } from '../../actions/accounts';

/**
 * Using react-redux connect to pass state and dispatch to Login
 */
const mapStateToProps = state => ({
  peers: state.peers,
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
  activePeerSet: data => dispatch(activePeerSet(data)),
  accountsRetrieved: () => dispatch(accountsRetrieved()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing);
