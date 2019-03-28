import * as actions from "../Actions/CreditPointActions";

const initSate = {
    creditpoints : []
};

const CreditPointReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_CREDIT_POINT: {
      return { ...state, creditpoint: action.payload };
    }
    case actions.CREATE_CREDIT_POINT: {
        return { ...state, creditpoint: [{...action.payload},...state.creditpoint] };
      }
    case actions.EDIT_CREDIT_POINT: {
      let model = action.payload;
      let creditpoint = state.creditpoint.map( m => (m.id === model.id) ?{...model}:{...m});
      return { ...state,creditpoint };
    }
    case actions.DELETE_CREDIT_POINT: {
      let creditpoint = state.creditpoint.filter( m => m.id !== action.payload);
      return { ...state, creditpoint };
    }
    default:
    return state;
  }
};

export default CreditPointReducer;
