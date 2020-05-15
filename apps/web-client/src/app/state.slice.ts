import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const STATE_FEATURE_KEY = 'state';

/*
 * Update these interfaces according to your requirements.
 */
export interface StateEntity {
  id: number;
}

export interface StateState extends EntityState<StateEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const stateAdapter = createEntityAdapter<StateEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchStates = createAsyncThunk(
  'state/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getStates()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialStateState: StateState = stateAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const stateSlice = createSlice({
  name: STATE_FEATURE_KEY,
  initialState: initialStateState,
  reducers: {
    addState: stateAdapter.addOne,
    removeState: stateAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStates.pending, (state: StateState) => {
      state.loadingStatus = 'loading';
    });
    builder.addCase(
      fetchStates.fulfilled,
      (state: StateState, action: PayloadAction<StateEntity[]>) => {
        stateAdapter.addMany(state, action.payload);
        state.loadingStatus = 'loaded';
      }
    );
    builder.addCase(fetchStates.rejected, (state: StateState, action) => {
      state.loadingStatus = 'error';
      state.error = action.error.message;
    });
  },
});

/*
 * Export reducer for store configuration.
 */
export const stateReducer = stateSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * const dispatch = useDispatch();
 * dispatch(stateActions.addState([{ id: 1 }]));
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const stateActions = {
  ...stateSlice.actions,
  fetchStates,
};

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * const entities = useSelector(selectStateEntities);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const stateSelectors = {
  getStateState: (rootState: unknown): StateState =>
    rootState[STATE_FEATURE_KEY],
  ...stateAdapter.getSelectors(),
};
