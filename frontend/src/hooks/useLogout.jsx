import { useNavigate } from "react-router-dom";

function useLogout(setIsAuthenticated) {
  const navigate = useNavigate();

  const logout = () => {
    // Eliminar el estado de autenticación del localStorage
    localStorage.removeItem("isAuthenticated");

    // Actualizar el estado de autenticación para forzar la actualización del layout
    setIsAuthenticated(false);  // Actualizamos el estado para que el layout se actualice

    // Redirigir a la página de inicio
    navigate("/"); // Redirige a la página de inicio sin recargar
  };

  return logout;
}

export default useLogout;
