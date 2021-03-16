import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation,
    Redirect
} from "react-router-dom";

export default function Marketplace() {
    return (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/Home">Home</Link>
                    </li>
                    <li>
                        <Link to="/phone">Phone</Link>
                    </li>
                    <li>
                        <Link to="/laptop">Laptop</Link>
                    </li>
                    <li>
                        <Link to="/accesories">Accesories</Link>
                    </li>
                </ul>

                <hr />
                <Switch>
                    <Route path="/Home"> <Home /> </Route>
                    <Route path="/login"> <LoginPage /> </Route>
                    <PrivateRoute path="/phone"> <Phone /> </PrivateRoute>
                    <PrivateRoute path="/laptop"> <Laptop /> </PrivateRoute>
                    <PrivateRoute path="/accesories"> <Accesories /> </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

const fakeAuth = {
    isAuthenticated : false,
    authenticate(cb){
        fakeAuth.isAuthenticated = true;
        setTimeout(cb,100) 
    },
    signout(cb){
        fakeAuth.isAuthenticated = false;
        setTimeout(cb,100) 
    }
};

function AuthButton() {
    let history = useHistory();

    return fakeAuth.isAuthenticated ? (
        <p>
            Welcome! {" "}
            <button onClick={() => {
                fakeAuth.signout(() => history.push("/"))
            }}>
                Sign Out
            </button>
        </p>
    ) : (
        <h3> Kowloon Store </h3>
    );
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route {...rest} 
        render={({ location }) => 
        fakeAuth.isAuthenticated ? (
            children
            ) : (
            <Redirect to={{
                pathname: "/login",
                state: { from: location }
                }} 
            />
            )
            } 
        />      
    );
}

function Home() {
    return <h3>Welcome to our Marketplace!</h3>
}

function Phone() {
    return (
        <Router>
        <div>
            <h3>Phone Section</h3>
            <ul>
                <li>
                    <Link to="/phone/xiaomi">Xiaomi</Link>
                </li>
                <li>
                    <Link to="/phone/samsung">Samsung</Link>
                </li>
                <li>
                    <Link to="/phone/apple">Apple</Link>
                </li>
            </ul>
            <hr />
                <Switch>
                    <Route path="/phone/xiaomi"> <Xiaomi /> </Route>
                    <Route path="/phone/samsung"> <Samsung /> </Route>
                    <Route path="/phone/apple"> <Apple /> </Route>
                </Switch>
        </div>
        </Router>
    )
}

function Xiaomi() {
    return(
        <div>
            <h3>Xiaomi Section</h3>
        </div>
    )
}

function Apple() {
    return(
        <div>
            <h3>Apple Section</h3>
        </div>
    )
}

function Samsung() {
    return(
        <div>
            <h3>Samsung Section</h3>
        </div>
    )
}


function Laptop() {
    return (
        <h3>Laptop Section</h3>
    )
}

function Accesories() {
    return (
        <h3>Accesories Section</h3>
    )
}

function LoginPage() {
    let history = useHistory()
    let location = useLocation()

    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from)
        });
    };

    return (
        <div>
            <p> You must login to view the page at {from.pathname} </p>
            <button onClick={login}>Login</button>
        </div>
    );
}