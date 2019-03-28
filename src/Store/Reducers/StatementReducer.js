import * as actions from "../Actions/StatementActions";

const initSate = {
  statements : []
};

const StatementReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_STATEMENTS: {
      return { ...state, statements: action.payload };
    }
    case actions.CREATE_STATEMENT: {
      return { ...state, statements: [{...action.payload},...state.statements] };
    }
    case actions.EDIT_STATEMENT: {
      let model = action.payload;
      let statements = state.statements.map( m => {
        if(m.id === model.id){
          return {...model}
        }
        return {...m}
      });
      return { ...state,statements };
    }
    case actions.DELETE_STATEMENT: {
      let statements = state.statements.filter( m => m.id !== action.payload);
      return { ...state, statements };
    }
    default:
    return state;
  }
};

export default StatementReducer;
