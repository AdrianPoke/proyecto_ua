import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Eliminar el estado de autenticación del localStorage
    localStorage.removeItem("isAuthenticated");

    // Redirigir a la página de inicio
    navigate("/"); // Redirige a la página de inicio
  };

  return logout;
}

export default useLogout;
