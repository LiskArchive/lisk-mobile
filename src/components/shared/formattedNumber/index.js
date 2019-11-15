import React from 'react';
import { BigNumber } from 'bignumber.js';
import { Text } from 'react-native';
import { languageMap } from '../../../constants/languages';

const reg2 = /-?([0-9,]+\.(([0]{0,2})[1-9]{1,2})?)|-?(0\.([0]+)?[1-9]{1,2})/g;

class FormattedNumber extends React.Component {
  render() {
    const { val, children, type, style, trim, tokenType } = this.props;
    const language = languageMap.en.code;
    const Element = type || Text;
    const bigNum = new BigNumber(val || children);
    const formatedNumber = bigNum.toFormat();
    const matched = formatedNumber.match(reg2);
    const normalizedVal =
      trim && matched && matched[0] !== '0.' && matched[0] !== '-0.'
        ? matched[0].replace(/\.$/, '')
        : formatedNumber;
    const valueWithoutSeparators = normalizedVal.replace(/,/g, '');
    const localizedVal = Number(valueWithoutSeparators).toLocaleString(
      `${language}-${language.toUpperCase()}`,
      { maximumFractionDigits: 20 }
    );
    return (
      <Element style={style}>
        {localizedVal} {tokenType || 'LSK'}
      </Element>
    );
  }
}

export default FormattedNumber;
