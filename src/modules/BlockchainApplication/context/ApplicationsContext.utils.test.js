import {
  applicationPinsContextReducer,
  applicationsContextReducer,
} from './ApplicationsContext.utils';

describe('applicationsContextReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(applicationsContextReducer()).toEqual([]);
  });

  it('should handle "init" action', () => {
    const applications = [
      { chainID: '123', name: 'Test Chain' },
      { chainID: '456', name: 'Another Test Chain' },
    ];
    expect(applicationsContextReducer([], { type: 'init', applications })).toEqual(applications);
  });

  it('should handle "add" action', () => {
    const state = [
      { chainID: '123', name: 'Test Chain' },
      { chainID: '456', name: 'Another Test Chain' },
    ];
    const application = { chainID: '789', name: 'New Chain' };
    expect(applicationsContextReducer(state, { type: 'add', application })).toEqual([
      ...state,
      application,
    ]);

    // should not add if chainID already exists
    expect(
      applicationsContextReducer(state, {
        type: 'add',
        application: { chainID: '123', name: 'Test Chain' },
      })
    ).toEqual(state);
  });

  it('should handle "delete" action', () => {
    const state = [
      { chainID: '123', name: 'Test Chain' },
      { chainID: '456', name: 'Another Test Chain' },
    ];
    expect(applicationsContextReducer(state, { type: 'delete', chainID: '456' })).toEqual([
      { chainID: '123', name: 'Test Chain' },
    ]);
  });
});

describe('applicationPinsContextReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(applicationPinsContextReducer()).toEqual([]);
  });

  it('should handle "init" action', () => {
    const pins = ['123', '456'];
    expect(applicationPinsContextReducer([], { type: 'init', pins })).toEqual(pins);
  });

  it('should handle "add" action', () => {
    const state = ['123', '456'];
    const chainID = '789';
    expect(applicationPinsContextReducer(state, { type: 'add', chainID })).toEqual([
      ...state,
      chainID,
    ]);

    // should not add if chainID already exists
    expect(applicationPinsContextReducer(state, { type: 'add', chainID: '123' })).toEqual(state);
  });

  it('should handle "delete" action', () => {
    const state = ['123', '456'];
    expect(applicationPinsContextReducer(state, { type: 'delete', chainID: '456' })).toEqual([
      '123',
    ]);
  });
});
