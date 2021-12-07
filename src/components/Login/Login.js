import { Form, Button, Nav, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = ({ history }) => {

    const { login } = useAuth();

    const onLoginHandler = (e) => {
        e.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(e.currentTarget));


        authService.login(email, password)
            .then((authData) => {
                login(authData);

                history.push('/');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    return (
        <section id="login-page" className="login-section">
            <Form onSubmit={onLoginHandler} method="POST" className="login-form">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter Password" required />
                </Form.Group>
                <Form.Group className="auth-btn-section">
                    <Button variant="primary" className="auth-btn" type="submit">Login</Button>{' '}
                    <Button variant="outline-secondary" className="auth-btn" as={Link} to="/register">Register</Button>
                </Form.Group>
            </Form>
        </section >
    );

};

export default Login;