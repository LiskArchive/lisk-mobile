import settings from './settings';
import actionTypes from '../../constants/actions';
import { themes } from '../../constants/styleGuide';


describe('Reducers: Settings', () => {
  let state;

  beforeEach(() => {
    state = {};
  });

  it('should create the empty state initially', () => {
    const createdState = settings();
    const emptyState = { theme: themes.light };
    expect(createdState).toEqual(emptyState);
  });

  it('should return updated state in case of actionTypes.settingsUpdated', () => {
    const action = {
      type: actionTypes.settingsUpdated,
      data: {
        sensorType: 'Face ID',
      },
    };
    const changedState = settings(state, action);
    expect(changedState).toEqual({
      sensorType: 'Face ID',
    });
  });
});

