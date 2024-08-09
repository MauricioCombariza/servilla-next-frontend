import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase";
// import { useNavigate, Navigate } from "react-router-dom";

interface User {
  email: string;
  nombre: string;
  id_bodega: number
  rol: number
  activate: number
}

export interface AuthContextProps {
  authorized: boolean;
  user: User;
  token: string;
  setToken: (token: string) => void;
  login: (userId: string) => void;
  signup: () => void;
  logout: () => void;
  isMensajero: boolean,
  setIsMensajero: (isMensajero:boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
  authorized: false,
  user: {
    email: '',
    nombre: '',
    id_bodega: 1,
    activate: 1,
    rol: 1
  },
  token: '',
  setToken: () => {
    null
  },
  isMensajero: false,
  setIsMensajero: () => false,
  login: () => {
    null
  },
  signup: () => {
    null
  },
  logout: () => {
    null
  }
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    nombre: '',
    id_bodega: 1,
    activate: 1,
    rol: 1
  })
  const [authorized, setAuthorized] = useState(false)
  const [token, setToken] = useState('')

  // Estado para mostrar o no el input en el formulario para filtrar este informe
  const [ isMensajero, setIsMensajero] = useState<boolean>(false)

  const login = async (userId: string) => {
    console.log('Ingreso a login')
    const { data, error } = await supabase
      .from('usuarios')
      .select('*') // Select all columns
      .eq('id_uuid', userId);

      console.log('DataUsuario:', data)
  
    if (error) {
      console.log('Error fetching user data:', error.message);
      return;
    }
    if (!data || data.length === 0) {
      console.log('No user data found');
      return;
    }
  
    const fetchedUser = data[0] as User; // Type assertion for clarity
  
    // Update user state while preserving immutability
    setUser((prevUser) => ({
      ...prevUser,
      email: fetchedUser.email,
      nombre: fetchedUser.nombre,
      id_bodega: fetchedUser.id_bodega,
      rol: fetchedUser.rol,
    }));
  
    setAuthorized(true);
    router.push("/Indice");
  };
  const signup = () => {
    router.push("/Indice");
  }
  const newToken = (token: string) => {
    setToken(token)
  }
  const newAuthorized = () =>{
    setAuthorized(true)
  }
  const logout = () => {
    setUser({
      email: '',
      nombre: '',
      id_bodega: 1,
      activate: 1,
      rol: 1
    });
    router.push("/");
    setAuthorized(false)
    setToken('')
  };
  const auth = {
    authorized,
    user,
    newToken,
    newAuthorized,
    setToken,
    token,
    login,
    signup,
    logout,
    // Set de todas los input autorizados para los informes
    isMensajero,
    setIsMensajero,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextProps {
  const auth = useContext<AuthContextProps>(AuthContext);
  return auth;
}

function ProtectRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.authorized) {
    // Redirigir al usuario a la página de inicio de sesión si no está autorizado
    router.push('/ingresar');
    return null; // Puedes devolver null aquí, ya que la redirección hará que el componente de la página de inicio de sesión se cargue.
  }

  return <>{children}</>;
}


export { AuthProvider, useAuth, ProtectRoute };
