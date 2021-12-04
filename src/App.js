import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import NavHeader from './components/NavHeader';
//import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
//import BoardsList from './components/BoardsList';
import Board from './components/Taskboard/Board';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <NavHeader />
                <main>
                    <Switch>
                        <Route path="/" exact component={Board} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </main>
                <footer>

                </footer>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
