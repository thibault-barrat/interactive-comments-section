import { Comment } from "../utils/models";

export enum ACTION_TYPES {
  SHOW_LOGIN_FORM = "SHOW_LOGIN_FORM",
  HIDE_LOGIN_FORM = "HIDE_LOGIN_FORM",
  CHANGE_LOGIN_FORM_FIELD = "CHANGE_LOGIN_FORM_FIELD",
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
  UPDATE_LOGIN_FORM_ERROR = "UPDATE_LOGIN_FORM_ERROR",
  SIGNUP = "SIGNUP",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  CHANGE_SIGNUP_FORM_FIELD = "CHANGE_SIGNUP_FORM_FIELD",
  SHOW_SIGNUP_FORM = "SHOW_SIGNUP_FORM",
  HIDE_SIGNUP_FORM = "HIDE_SIGNUP_FORM",
  UPDATE_SIGNUP_FORM_ERROR = "UPDATE_SIGNUP_FORM_ERROR",
  GET_COMMENTS = "GET_COMMENTS",
  GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
  UPDATE_COMMENT = "UPDATE_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  UPDATE_SCORE = "UPDATE_SCORE",
}

export type Action =
  | { type: ACTION_TYPES.SHOW_LOGIN_FORM }
  | { type: ACTION_TYPES.HIDE_LOGIN_FORM }
  | {
      type: ACTION_TYPES.CHANGE_LOGIN_FORM_FIELD;
      payload: { field: "email" | "password"; value: string };
    }
  | { type: ACTION_TYPES.LOGIN }
  | {
      type: ACTION_TYPES.LOGIN_SUCCESS;
      payload: { id: number; accessToken: string; avatarUrl: string };
    }
  | { type: ACTION_TYPES.LOGOUT }
  | {
      type: ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR;
      payload: { emailError: string; passwordError: string };
    }
| { type: ACTION_TYPES.SIGNUP }
  | {type: ACTION_TYPES.SIGNUP_SUCCESS }
| { type: ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD, payload: { field: "username" | "email" | "password" | "confirmPassword", value: string } }
| { type: ACTION_TYPES.SHOW_SIGNUP_FORM }
| { type: ACTION_TYPES.HIDE_SIGNUP_FORM }
| { type: ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR, payload: { field: "usernameError" | "emailError" | "passwordError" | "confirmPasswordError", error: string } }
| { type: ACTION_TYPES.GET_COMMENTS }
| { type: ACTION_TYPES.GET_COMMENTS_SUCCESS; payload: Comment[] }
| { type: ACTION_TYPES.UPDATE_COMMENT; payload: { id: number; content: string } }
| { type: ACTION_TYPES.DELETE_COMMENT; payload: number }
| { type: ACTION_TYPES.UPDATE_SCORE; payload: { id: number; score: number } };
