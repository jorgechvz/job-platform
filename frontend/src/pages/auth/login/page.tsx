import LoginForm from "@/auth/components/LoginForm";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  // Mostrar notificacion cuando se desea ver una pagina protegida sin estar logueado
  const location = useLocation();
  const notificationShownRef = useRef(false);

  useEffect(() => {
    if (
      location.state &&
      location.state.showNotification &&
      !notificationShownRef.current
    ) {
      toast.warning(location.state.notificationTitle, {
        description: location.state.notificationDescription,
      });

      notificationShownRef.current = true;

      if (window.history && window.history.replaceState) {
        const newState = { ...location.state };
        delete newState.showNotification;
        delete newState.notificationTitle;
        delete newState.notificationDescription;
        window.history.replaceState(newState, document.title);
      }
    }
  }, [location]);
  return <LoginForm />;
};

export default LoginPage;
