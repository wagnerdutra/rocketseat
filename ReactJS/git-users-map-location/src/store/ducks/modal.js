export const Types = {
  OPEN: 'modal/OPEN',
  CLOSE: 'modal/CLOSE'
};

const INITIAL_STATE = false;

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN:
      return true;
    case Types.CLOSE:
      return false;
    default:
      return state;
  }
}

export const Creators = {
  openModal: () => ({
    type: Types.OPEN,
    payload: true
  }),
  closeModal: () => ({
    type: Types.CLOSE,
    payload: false
  })
};
