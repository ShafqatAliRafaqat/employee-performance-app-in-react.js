import * as actions from "../Actions/ProjectActions";

const initSate = {
  projects: []
};

const ProjectReducer = (state = initSate, action) => {
  switch (action.type) {
    case actions.GET_PROJECTS: {
      return { ...state, projects: action.payload };
    }
    case actions.CREATE_PROJECT: {
      return { ...state, projects: [{ ...action.payload }, ...state.projects] };
    }
    case actions.EDIT_PROJECT: {
      let model = action.payload;
      let projects = state.projects.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      return { ...state, projects };
    }
    case actions.DELETE_PROJECT: {
      let projects = state.projects.filter(m => m.id !== action.payload);
      return { ...state, projects };
    }
    default:
      return state;
  }
};

export default ProjectReducer;
