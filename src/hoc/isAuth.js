import { useAuth } from "../contexts/AuthContext";
import { Redirect } from 'react-router-dom';

export const isAuth = (Component) => {

    const OuterComponent = (props) => {

        const { isAuthenticated } = useAuth();
        return (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/login" />
        );
    }

    return OuterComponent;
}