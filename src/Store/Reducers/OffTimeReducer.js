import * as actions from "../Actions/OffTimeActions";

const initSate = {
  offtimes : []
};

const OffTimeReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_OFFTIMES: {
      return { ...state, offtimes: action.payload };
    }
    case actions.EDIT_OFFTIME: {
      let model = action.payload;
      let offtimes = state.offtimes.map( m => (m.id === model.id) ?{...model}:{...m});
      return { ...state,offtimes };
    }
    case actions.DELETE_OFFTIME: {
      let offtimes = state.offtimes.filter( m => m.id !== action.payload);
      return { ...state, offtimes };
    }
    default:
    return state;
  }
};

export default OffTimeReducer;
