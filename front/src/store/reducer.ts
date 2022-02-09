import { ACTION_TYPES, Action } from "./actions";
import { Comment } from "../utils/models";

export const initialState = {
  comments: [] as Comment[],
  loading: false,
  newCommentContent: "",
  loginForm: {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    show: false,
    loading: false,
  },
  signupForm: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    show: false,
    loading: false,
  },
  isLogged: false,
  id: -1,
  accessToken: "",
  avatarUrl: "",
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SHOW_LOGIN_FORM:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          show: true,
        },
      };
    case ACTION_TYPES.HIDE_LOGIN_FORM:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          show: false,
        },
      };
    case ACTION_TYPES.CHANGE_LOGIN_FORM_FIELD:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          [action.payload.field]: action.payload.value,
        },
      };
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: true,
        },
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        id: action.payload.id,
        accessToken: action.payload.accessToken,
        avatarUrl: action.payload.avatarUrl,
        loginForm: {
          ...state.loginForm,
          loading: false,
          show: false,
          email: "",
          password: "",
        },
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isLogged: false,
        id: -1,
        accessToken: "",
        avatarUrl: "",
      };
    case ACTION_TYPES.UPDATE_LOGIN_FORM_ERROR:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          loading: false,
          emailError: action.payload.emailError,
          passwordError: action.payload.passwordError,
        },
      };
    case ACTION_TYPES.SIGNUP:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          loading: true,
        },
      };
    case ACTION_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        loginForm: {
          ...state.loginForm,
          show: true,
        },
        signupForm: {
          ...state.signupForm,
          loading: false,
          show: false,
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
      };
    case ACTION_TYPES.CHANGE_SIGNUP_FORM_FIELD:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          [action.payload.field]: action.payload.value,
        },
      };
    case ACTION_TYPES.SHOW_SIGNUP_FORM:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          show: true,
        },
      };
    case ACTION_TYPES.HIDE_SIGNUP_FORM:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          show: false,
        },
      };
    case ACTION_TYPES.UPDATE_SIGNUP_FORM_ERROR:
      return {
        ...state,
        signupForm: {
          ...state.signupForm,
          [action.payload.field]: action.payload.error,
          loading: false,
        },
      };
    case ACTION_TYPES.GET_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case ACTION_TYPES.CHANGE_NEW_COMMENT_CONTENT:
      return {
        ...state,
        newCommentContent: action.payload,
      };
    case ACTION_TYPES.UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? {
                ...comment,
                content: action.payload.content,
              }
            : comment
        ),
      };
    case ACTION_TYPES.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
      case ACTION_TYPES.UPDATE_SCORE:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id
            ? {
                ...comment,
                score: action.payload.score,
              }
            : comment
        ),
      };
    default:
      return state;
  }
};
