import * as actions from "../Actions/LeaveActions";

const initSate = {
  leaves : []
};

const LeaveReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_LEAVES: {
      return { ...state, leaves: action.payload };
    }
    case actions.CREATE_LEAVE: {
        return { ...state, leaves: [{...action.payload},...state.leaves] };
      }
    case actions.EDIT_LEAVE: {
      let model = action.payload;
      let leaves = state.leaves.map( m => (m.id === model.id) ?{...model}:{...m});
      return { ...state,leaves };
    }
    case actions.DELETE_LEAVE: {
      let leaves = state.leaves.filter( m => m.id !== action.payload);
      return { ...state, leaves };
    }
    default:
    return state;
  }
};

export default LeaveReducer;
