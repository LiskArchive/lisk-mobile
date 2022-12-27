import darkMediumOutgoing from 'assets/images/amountBlur/outgoing/darkMedium.png';
import darkSmallOutgoing from 'assets/images/amountBlur/outgoing/darkSmall.png';
import darkMediumIncoming from 'assets/images/amountBlur/incoming/darkMedium.png';
import darkSmallIncoming from 'assets/images/amountBlur/incoming/darkSmall.png';
import lightMediumOutgoing from 'assets/images/amountBlur/outgoing/lightMedium.png';
import lightSmallOutgoing from 'assets/images/amountBlur/outgoing/lightSmall.png';
import lightMediumIncoming from 'assets/images/amountBlur/incoming/lightMedium.png';
import lightSmallIncoming from 'assets/images/amountBlur/incoming/lightSmall.png';
import darkBigBalance from 'assets/images/balanceBlur/darkBig.png';
import darkMediumBalance from 'assets/images/balanceBlur/darkMedium.png';
import darkSmallBalance from 'assets/images/balanceBlur/darkSmall.png';
import lightBigBalance from 'assets/images/balanceBlur/lightBig.png';
import lightMediumBalance from 'assets/images/balanceBlur/lightMedium.png';
import lightSmallBalance from 'assets/images/balanceBlur/lightSmall.png';

export const BLUR_VARIANTS = {
  outgoing: {
    darkSmall: darkSmallOutgoing,
    darkMedium: darkMediumOutgoing,
    lightSmall: lightSmallOutgoing,
    lightMedium: lightMediumOutgoing,
  },
  incoming: {
    darkSmall: darkSmallIncoming,
    darkMedium: darkMediumIncoming,
    lightSmall: lightSmallIncoming,
    lightMedium: lightMediumIncoming,
  },
  balance: {
    darkSmall: darkSmallBalance,
    darkMedium: darkMediumBalance,
    darkBig: darkBigBalance,
    lightSmall: lightSmallBalance,
    lightMedium: lightMediumBalance,
    lightBig: lightBigBalance,
  },
};
