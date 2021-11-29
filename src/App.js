import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavHeader from './components/NavHeader';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import BoardsList from './components/BoardsList';





function App() {
    return (
        <BrowserRouter>
            <NavHeader />
            <main>
                <Switch>
                    <Route path="/" exact component={BoardsList} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/logout" render={(props) => {
                        console.log('Logged Out!!!');
                        return <Redirect to="/" />
                    }} />
                </Switch>
            </main>
            <footer>

            </footer>
        </BrowserRouter>
    );
}

export default App;
