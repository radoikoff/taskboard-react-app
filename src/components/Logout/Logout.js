import * as authService from '../../services/authService'
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Logout = ({history}) => {

    const { user, logout } = useAuth();
   
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();
                history.push('/');
            })
    }, [])

    return null;
};

export default Logout;