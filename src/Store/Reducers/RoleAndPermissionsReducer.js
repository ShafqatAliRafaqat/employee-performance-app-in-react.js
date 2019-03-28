import * as actions from "../Actions/RoleAndPermissionActions";

const initSate = {
  roles : [],
  usersRoles:[],
  permissions:[],
  rolePermissions:[],
  userPermissions:[]
};

const RoleAndPermissionsReducer = (state = initSate, action) => {

  switch (action.type) {

    case actions.GET_ROLES: {
      return {...state,roles:action.payload};
    }

    case actions.GET_USER_ROLES:{

      let usersRoles = [...state.usersRoles,{
        id:action.payload.id,
        roles:action.payload.roles
      }];

      return {...state,usersRoles:usersRoles};
    }

    case actions.EDIT_USER_ROLES:{

      let usersRoles = state.usersRoles.map(ur=>{
        if(ur.id !== action.payload.id){
          return {...ur};
        }
        return {...ur,roles:action.payload.roles};
      });

      return {...state,usersRoles:usersRoles};
    }

    case actions.GET_PERMISSIONS:{
      return {...state,permissions:action.payload};
    }

    case actions.GET_ROLE_PERMISSIONS:{
      return state;
    }

    case actions.GET_USER_PERMISSIONS:{
      return state;
    }
    default:
    return state;
  }
};

export default RoleAndPermissionsReducer;
