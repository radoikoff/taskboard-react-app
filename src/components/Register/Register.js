import { Form, Button, Row, Col } from 'react-bootstrap';
import * as authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import * as notifications from '../../helpers/notifications';
//import './Register.css';

const Register = ({ history }) => {

    const { login } = useAuth();

    const onLoginHandler = (e) => {
        e.preventDefault();

        const { email, password, repass, firstName, lastName } = Object.fromEntries(new FormData(e.currentTarget));

        //TODO: the validation

        authService.register(email, password, firstName, lastName)
            .then((authData) => {
                console.log(authData)
                login(authData);

                history.push('/');
            })
            .catch(err => {
                notifications.createError(err.message);
            });
    }

    return (
        <section id="login-page" className="login-section">
            <Form onSubmit={onLoginHandler} method="POST" className="login-form">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email..." required />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="Enter first name..." required />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Enter last name..." required />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter password..." required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repass">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="repass" placeholder="Reenter password..." required />
                </Form.Group>
                <Form.Group className="auth-btn-section">
                    <Button variant="primary" className="auth-btn" type="submit">Register</Button>{' '}
                    <Button variant="outline-secondary" className="auth-btn" as={Link} to="/login">Login</Button>
                </Form.Group>
            </Form>
        </section >
    );

};

export default Register;