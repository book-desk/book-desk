import { stateActions, stateAdapter, stateReducer } from './state.slice';

describe('state reducer', () => {
  it('should handle initial state', () => {
    const expected = stateAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(stateReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStates', () => {
    let state = stateReducer(
      undefined,
      stateActions.fetchStates.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = stateReducer(
      state,
      stateActions.fetchStates.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = stateReducer(
      state,
      stateActions.fetchStates.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
