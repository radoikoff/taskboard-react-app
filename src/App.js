import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { AuthProvider } from './contexts/AuthContext';
import { isAuth } from './hoc/isAuth';

import 'react-notifications/lib/notifications.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './App.css';

import NavHeader from './components/NavHeader';
//import Dashboard from './components/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout';
//import BoardsList from './components/BoardsList';

import BoardsList from './components/BoardList/BoardsList';
import CreateBoard from './components/CreateBoard/CreateBoard';
import BoardDetails from './components/BoardDetails';
import EditBoard from './components/EditBoard/EditBoard';
import Board from './components/Taskboard/Board';

import CreateTask from './components/CreateTask/CreateTask';


function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <NavHeader />
                <main>
                    <Switch>
                        <Route path="/" exact component={BoardsList} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/boards" exact component={BoardsList} />
                        <Route path="/boards/details/:boardId" component={BoardDetails} />
                        <Route path="/boards/edit/:boardId" component={EditBoard} />
                        <Route path="/boards/create" component={isAuth(CreateBoard)} />
                        <Route path="/boards/:boardId" component={Board} />
                        <Route path="/tasks/create" component={isAuth(CreateTask)} />
                        <Route component={() => (<p>Not found</p>)} />
                    </Switch>
                </main>
                <footer>

                </footer>
                <NotificationContainer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
