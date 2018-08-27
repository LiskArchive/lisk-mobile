import React from 'react';
import NavigatorButton from './navigatorButton';
import { Element } from './element';
import {
  backButtonFn, isActiveStep, isActiveGroup, groupSteps,
} from './utils';

const MultiStepNav = ({
  steps, interactive, current, backButtonTitle,
  groupButton, stepButton, backButton, hideGroups, hideSteps,
  prevPage, prevStep, move, normalizedStyles,
}) =>
  (<Element {...normalizedStyles.multiStepNavWrapper}>
    {
      (backButton !== undefined && backButton !== null) ?
        <NavigatorButton
          customButton={backButton}
          disabled={current === 0}
          onClick={() => backButtonFn(current, prevPage, prevStep)}>{
            backButtonTitle}</NavigatorButton> : null
    }
    <Element {...normalizedStyles.multiStepGroupWrapper}>
      {
        groupSteps(steps).map((group, gIdx) =>
          <Element {...normalizedStyles.multiStepGroup} key={`group-${group.title}-${gIdx}`}>
            {
              !hideGroups ?
              <NavigatorButton
                customButton={groupButton}
                onClick={() => { if (interactive) move({ to: (group.steps[0].index) }); }}
                disabled={isActiveGroup(current, group)}>{ group.title }</NavigatorButton> : null
            }
            {
              !hideSteps ?
              group.steps.map((step, sIdx) =>
                <NavigatorButton
                  customButton={stepButton}
                  key={`step-${step.component.props.title}-${sIdx}`}
                  onClick={() => { if (interactive) move({ to: (step.index) }); }}
                  disabled={isActiveStep(current, step.index)}>{
                    step.component.props.title
                  }</NavigatorButton>) : null
            }
          </Element>)
      }
    </Element>
  </Element>);

export default MultiStepNav;
