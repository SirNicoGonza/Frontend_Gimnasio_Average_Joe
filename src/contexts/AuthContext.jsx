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
        rol: action.payload.rol,
        isAuthenticated: true,
      };
    case ACTIONS.LOGOUT:
      return {
        isAuthenticated: false,
        token: null,
        rol: null,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    token: localStorage.getItem("authToken"),
    rol: localStorage.getItem("authRol"),
    isAuthenticated: !!localStorage.getItem("authToken"),
  });

  const login = useCallback((token, rol) => {
    console.log("Actualizando estado de autenticación..."); 
    dispatch({ type: ACTIONS.LOGIN, payload: { token, rol } });
    localStorage.setItem("authToken", token);
    localStorage.setItem("authRol", rol);
    console.log("Estado de autenticación actualizado:", { token, rol }); // Depuración
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: ACTIONS.LOGOUT });
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRol");
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