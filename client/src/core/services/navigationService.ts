import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goTo: (path: string) => navigate(path),
  };
};

export default useNavigation;
