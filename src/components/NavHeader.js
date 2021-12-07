import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavHeader = () => {

    const { user } = useAuth();

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>Task Manager</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/boards">Boards</Nav.Link>
                    <Nav.Link as={Link} to="/">My Tasks</Nav.Link>
                </Nav>
                <Nav className="justify-content-end" variant="pills">
                    {user.email
                        ? (<>
                            <Navbar.Text>Welcome, {user.email}</Navbar.Text>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </>)
                        : (<>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>)}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavHeader;