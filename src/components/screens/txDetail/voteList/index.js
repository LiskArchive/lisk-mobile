import React, { Fragment } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { translate } from 'react-i18next';
import withTheme from '../../../shared/withTheme';
import { B } from '../../../shared/toolBox/typography';
import Row from '../row';
import getStyles from './styles';
import loadingAnimation from '../../../../assets/animations/loading-dots.json';

const VoteList = ({
  upvotes, downvotes, styles, t
}) => {
  const loader = <View style={styles.pendingIcon}>
    <LottieView source={loadingAnimation} autoPlay />
  </View>;
  const listVotes = vote => (
    <View
      key={vote.username}
      style={[styles.votesContainer, styles.theme.votesContainer]}
    >
      <View
        style={[styles.voteNumberContainer, styles.theme.voteNumberContainer]}
      >
        <B style={[styles.voteNumber, styles.theme.voteNumber]}>
          #{vote.rank}
        </B>
      </View>
      <B style={[styles.vote, styles.theme.vote]}>{vote.username}</B>
    </View>
  );

  return <Fragment>
    {upvotes && (
      <Row
        style={styles.votesRow}
        icon="plus-vote"
        title={t('Added votes')}
      >
        {
          upvotes.length
            ? upvotes.map(vote => listVotes(vote))
            : loader
        }
      </Row>
    )}
    {downvotes && (
      <Row
        style={styles.votesRow}
        icon="minus-vote"
        title={t('Removed votes')}
      >
        {downvotes.length
          ? downvotes.map(vote => listVotes(vote))
          : loader}
      </Row>
    )}
  </Fragment>;
};

export default withTheme(translate()(VoteList), getStyles());
