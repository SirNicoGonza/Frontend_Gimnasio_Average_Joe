import { createContext, useReducer, useContext, useCallback } from "react";

const AuthContext = createContext({
  state: {},
  actions: {},
});

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      return {
        token: null,
        role: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    token: localStorage.getItem("authToken") || null,
    role: localStorage.getItem("authRole") || null,
    isAuthenticated: !!localStorage.getItem("authToken"),
  });

  const login = useCallback((token, role) => {
    console.log("Actualizando estado de autenticación...");
    dispatch({ type: ACTIONS.LOGIN, payload: { token, role } });
    localStorage.setItem("authToken", token);
    localStorage.setItem("authRole", role);
    console.log("Estado de autenticación actualizado:", { token, role });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRole"); // Cambiado a "authRole"
  }, []);

  return (
    <AuthContext.Provider value={{ state, actions: { login, logout } }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };