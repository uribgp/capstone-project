const DEFAULT_STATE = {
  name: null,
  id: null,
  error: false,
  loading: false,
  authenticated: false,
};


export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "LOGIN_LOADING":
      return {
        ...state,
        loading: true,
      }

      case "LOGIN_FAILED":
        return {
          ...state,
          loading: false,
            error: true,
        }

        case "LOGIN_SUCCEEDED":
          return {
            ...state,
            loading: false,
              error: false,
              authenticated: true,
              username: action.user.user.username,
              id: action.user.user.id
          }
          default:
          return {
            ...state
          }
  }

}