import * as actions from "../Actions/CompanyActions";

const initSate = {
  companies : []
};

const CompanyReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_COMPANIES: {
      return { ...state, companies: action.payload };
    }
    case actions.CREATE_COMPANY: {
      return { ...state, companies: [{...action.payload},...state.companies] };
    }
    case actions.EDIT_COMPANY: {
      let model = action.payload;
      let companies = state.companies.map( m => {
        if(m.id === model.id){
          return {...model}
        }
        return {...m}
      });
      return { ...state,companies };
    }
    case actions.DELETE_COMPANY: {
      let companies = state.companies.filter( m => m.id !== action.payload);
      return { ...state, companies };
    }
    default:
    return state;
  }
};

export default CompanyReducer;
