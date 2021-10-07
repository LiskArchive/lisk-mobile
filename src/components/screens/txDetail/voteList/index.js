import React, { Fragment } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import withTheme from '../../../shared/withTheme';
import { B, P } from '../../../shared/toolBox/typography';
import Row from '../row';
import getStyles from './styles';
import loadingAnimation from '../../../../assets/animations/loading-dots.json';
import FormattedNumber from '../../../shared/formattedNumber';
import { stringShortener } from '../../../../utilities/helpers';
import { fromRawLsk } from '../../../../utilities/conversions';

const VoteList = ({ votes, styles, t }) => {
  const loader = (
    <View style={styles.pendingIcon}>
      <LottieView source={loadingAnimation} autoPlay />
    </View>
  );
  const listVotes = (vote) => {
    const amount = Number(vote.amount) < 0 ? `-${fromRawLsk(vote.amount * -1)}` : fromRawLsk(vote.amount * -1);
    return (
      <View key={vote.delegateAddress} style={[styles.votesContainer, styles.theme.votesContainer]}>
        <View style={[styles.voteNumberContainer]}>
          <P style={[styles.voteNumber, styles.theme.voteNumber]}>
            {stringShortener(vote.delegateAddress, 5, 2)}
          </P>
        </View>
        <FormattedNumber trim={true} type={B}>
          {amount}
        </FormattedNumber>
      </View>
    );
  };

  return (
    <Fragment>
      {votes && (
        <Row style={styles.votesRow} title={`${t('Votes')} (${votes.length})`}>
          {votes.length ? votes.map((vote) => listVotes(vote)) : loader}
        </Row>
      )}
    </Fragment>
  );
};

export default withTheme(translate()(VoteList), getStyles());
