// Reducer for storing uploaded document content
import { AnyAction } from 'redux';

export interface AppState {
  uploadedContent: string | null;
  uploadError: string | null;
}

const initialState: AppState = {
  uploadedContent: null,
  uploadError: null,
};

export const SET_UPLOADED_CONTENT = 'SET_UPLOADED_CONTENT';
export const SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR';

export const setUploadedContent = (content: string) => ({
  type: SET_UPLOADED_CONTENT,
  payload: content,
});

export const setUploadError = (error: string) => ({
  type: SET_UPLOAD_ERROR,
  payload: error,
});

export default function appReducer(
  state = initialState,
  action: AnyAction,
): AppState {
  switch (action.type) {
    case SET_UPLOADED_CONTENT:
      return { ...state, uploadedContent: action.payload, uploadError: null };
    case SET_UPLOAD_ERROR:
      return { ...state, uploadError: action.payload };
    default:
      return state;
  }
}
