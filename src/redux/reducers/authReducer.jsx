import {
  AUTH_GET_USER_REQUEST,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAIL,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
} from "../constants/authConstants";

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_GET_USER_REQUEST:
      return {
        loading: true,
        error: null,
      };

    case AUTH_GET_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      };

    case AUTH_GET_USER_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return {...state}
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        loading: true,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      };

    case AUTH_LOGIN_FAIL:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };

    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };

    case AUTH_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.payload,
      };

    case AUTH_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_GET_USER_REQUEST:
    case AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case AUTH_GET_USER_SUCCESS:
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case AUTH_GET_USER_FAIL:
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
