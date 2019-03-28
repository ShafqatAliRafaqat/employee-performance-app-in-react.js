import APIModel from "../../Models/APIModel";
import axios from "axios";

export const GET_ROLES = "GET_ROLES";
export const GET_USER_ROLES = "GET_USER_ROLES";
export const EDIT_USER_ROLES = "EDIT_USER_ROLES";
export const GET_PERMISSIONS = "GET_PERMISSIONS";
export const GET_ROLE_PERMISSIONS = "GET_ROLE_PERMISSIONS";
export const GET_USER_PERMISSIONS = "GET_USER_PERMISSIONS";


export const createRole = (token,name) => {
  return axios.post(APIModel.HOST + "admin/roles",{
    name:name
  },{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createPermission = (token,name) => {
  return axios.post(APIModel.HOST + "admin/permissions",{
    name:name
  },{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editRolePermissions = (token,id,permissions) => {
  return axios.patch(APIModel.HOST + "admin/permissions/role/"+id,{
    permissions:permissions
  },{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getRoles = (token) => {
  return axios.get(APIModel.HOST + "admin/roles",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getUserRoles = (token,id) => {
  return axios.get(APIModel.HOST + "admin/roles/user/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editUserRoles = (token,id,roles) => {
  return axios.patch(APIModel.HOST + "admin/roles/user/"+id,{
    roles:roles
  },{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getPermissions = (token) => {
  return axios.get(APIModel.HOST + "admin/permissions",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getRolePermissions = (token,id) => {
  return axios.get(APIModel.HOST + "admin/permissions/role/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getUserPermissions = (token,id) => {
  return axios.get(APIModel.HOST + "admin/permissions/user/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
