import * as actions from "../Actions/NewActions";

const initSate = {
  news : []
};

const NewsReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_NEWS: {
      return { ...state, news: action.payload };
    }
    case actions.CREATE_NEWS: {
      return { ...state, news: [{...action.payload},...state.news] };
    }
    case actions.EDIT_NEWS: {
      let model = action.payload;
      let news = state.news.map( m => {
        if(m.id === model.id){
          return {...model}
        }
        return {...m}
      });
      return { ...state,news };
    }
    case actions.DELETE_NEWS: {
      let news = state.news.filter( m => m.id !== action.payload);
      return { ...state, news };
    }
    default:
    return state;
  }
};

export default NewsReducer;
