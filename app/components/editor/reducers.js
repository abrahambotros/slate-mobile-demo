import { CREATING_CASE, CREATE_CASE_SUCCESS, CREATE_CASE_ERROR, FETCHING_CASES, FETCH_CASES_SUCCESS,
  FETCH_CASES_ERROR, UPDATING_CASE, UPDATE_CASE_SUCCESS, UPDATE_CASE_ERROR } from './actions';

const initialState = {
  cases: {},
  loading: false,
  error: false,
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case FETCHING_CASES: {
      return { ...state, loading: true, error: false };
    }
    case CREATING_CASE: {
      return { ...state, loading: true, error: false };
    }
    case UPDATING_CASE: {
      return { ...state, loading: true, error: false };
    }
    case FETCH_CASES_SUCCESS: {
      return { ...state,  cases: action.payload.cases, error: false};
    }
    case FETCH_CASES_ERROR: {
      return { ...state,  message: action.payload.message, error: true};
    }
    case CREATE_CASE_SUCCESS: {
      return { ...state,  cases: state.cases.push(action.payload.case), error: false};
    }
    case CREATE_CASE_ERROR: {
      return { ...state,  message: action.payload.message, error: true};
    }
    case UPDATE_CASE_SUCCESS: {
      const index = state.cases.findIndex((updated) => { updated._id === action.payload.case._id })
      state.cases[index] = action.payload.case;
      return { ...state, error: false};
    }
    case UPDATE_CASE_ERROR: {
      return { ...state,  message: action.payload.message, error: true};
    }
    default: {
      return state;
    }
  }
}
