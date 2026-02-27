import { useNavigate } from 'react-router-dom';

export const useRouteNavigation = () => {

    const navigate = useNavigate();

    const navigateToRoute = (route) => {
        navigate(route);
    }

    return { navigateToRoute };
}
    