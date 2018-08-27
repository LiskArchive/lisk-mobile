import React from 'react';
import Nav from './navigator';
import { Element } from './element';
import { getStyles } from './utils';

/**
 *
 * Accepts any number of children with any context and accessibility
 * to store and utilities
 *
 * Each child except the last one, should accept a functional property
 * named cb, and call it with an object containing all the properties required
 * for the next step
 *
 * Every next child may expect all properties passed from previous step
 * in addition to the hard coded properties
 *
 * Last child may won't receive a cb function from MultiStep
 *
 * @param {Boolean} showNav - defines the visibility of navigation, defaults to true
 *
 *
 */
class MultiStep extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [{}],
      current: 0,
    };
  }

  next(data) {
    this.move({ moves: 1, data });
  }

  /**
   *
   * @param {Object} config
   * @param {Number} config.jump - The number of steps to jump back
   * @param {Boolean} config.reset - Should return to first step,
   *    this overrides all other configurations
   * @param {Number} config.to - The index of the step to go to
   * @memberOf MultiStep
   *
   */
  prev() {
    this.move({ moves: -1 });
  }

  reset() {
    this.move({ to: 0, reset: true });
  }

  // eslint-disable-next-line class-methods-use-this
  keepTargetInRange(target, moves, current, totalSteps) {
    if (typeof target === 'number') {
      return Math.max(Math.min(target, totalSteps - 1), 0);
    }
    return (moves > 0) ?
      Math.min(current + moves, totalSteps - 1) :
      Math.max(0, current + moves);
  }

  // eslint-disable-next-line class-methods-use-this
  setData(dataList, reset, stepData, target) {
    let newDataList = Object.assign({}, dataList);
    if (reset) {
      newDataList = [{}];
    } else {
      newDataList[target] = stepData || newDataList[target] || {};
    }

    return newDataList;
  }

  move({
    moves, to, stepData, reset,
  }) {
    const { current, data } = this.state;
    const { children } = this.props;

    const next = this.keepTargetInRange(to, moves, current, children.length);
    const nextData = this.setData(data, reset, stepData, next);

    this.setState({ current: next, data: nextData });
  }

  render() {
    const {
      children, finalCallback, backButtonTitle, styles, hideGroups, hideSteps,
      interactive, backButton, prevPage, navigatorButton, groupButton, stepButton,
    } = this.props;
    const { data, current } = this.state;
    const extraProps = {
      nextStep: this.next.bind(this),
      prevStep: this.prev.bind(this),
      ...data[current],
    };

    if (current === (children.length - 1)) {
      if (typeof finalCallback === 'function') {
        extraProps.finalCallback = finalCallback;
      }
      extraProps.reset = this.reset.bind(this);
    } else {
      extraProps.prevState = Object.assign({}, data[current + 1]);
    }

    const normalizedStyles = getStyles(styles);

    return (<Element {...normalizedStyles.multiStepWrapper}>
      {
        this.props.showNav ?
          <Nav
            normalizedStyles={normalizedStyles}
            hideGroups={hideGroups}
            hideSteps={hideSteps}
            steps={children}
            groupButton={groupButton}
            stepButton={stepButton}
            interactive={interactive}
            current={current}
            navigatorButton={navigatorButton}
            backButton={backButton}
            backButtonTitle={backButtonTitle}
            prevPage={prevPage}
            prevStep={this.prev.bind(this)}
            move={this.move.bind(this)} /> : null
      }
      {
        React.cloneElement(children[current], extraProps)
      }
    </Element>);
  }
}

export default MultiStep;
