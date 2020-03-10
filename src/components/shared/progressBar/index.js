import React from 'react';
import { View, Dimensions } from 'react-native';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

class Progress extends React.Component {
  render() {
    const {
      styles, current, total, progressStepContainerStyle
    } = this.props;

    const steps = [];
    for (let i = 0; i < total - 1; i++) {
      steps.push(i + 1);
    }

    const deviceWidth = Dimensions.get('window').width;
    const marginBetweenSteps = 3;
    const stepWidth = deviceWidth / (total - 1) - marginBetweenSteps;

    return (
      <View
        style={[
          styles.progressContainer,
          styles.theme.progressContainer,
          { opacity: current === total ? 0 : 1 },
        ]}
      >
        {steps.map(step => (
          <View
            key={step}
            style={[
              progressStepContainerStyle || styles.theme.progressStepContainer,
              { width: stepWidth },
            ]}
          >
            <View
              style={[
                styles.progressStep,
                { width: step <= current ? '100%' : 0 },
              ]}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default withTheme(Progress, getStyles());
