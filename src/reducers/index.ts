// WARNING: DO NOT DELETE ANY BOILERPLATE COMMENTS IN THIS FILE.
// IF YOU DO, GENERATED REDUCERS WILL NOT BE WIRED UP AUTOMATICALLY.
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter/reducer';
import appReducer from './appReducer';
// importRef

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    // reducerRef
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
