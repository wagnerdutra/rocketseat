export const Types = {
  ADD_REQUEST: 'users/ADD_REQUEST_USER',
  ADD_SUCCESS: 'users/ADD_SUCCESS',
  ADD_FAILURE: 'users/ADD_FAILURE'
};

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        data: [...state.data, action.payload.data],
        loading: false,
        error: false
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: !!action.payload.error };
    default:
      return state;
  }
}

export const Creators = {
  addUserRequest: user => ({
    type: Types.ADD_REQUEST,
    payload: { ...user }
  }),
  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),
  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  })
};
