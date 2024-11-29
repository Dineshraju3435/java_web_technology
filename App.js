import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Signin from './pages/signin';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Community from './pages/community';
import NewBlog from './pages/newBlog';


const App  = ()=>{
    // Like in computer networks, router will have the path to every .js file . if you give navigate("respective js")
    //the path in router will be activated and the respective js file is achevied.
    return(
        <div>
            <Router>  
                <Routes>
                <Route 
                    exact
                    path = '/' // navigate('/login') ==>this will redirect to the login.js page.
                    element = {<Login />}
                    />
                    <Route
                    exact 
                    path = '/signin'  // navigate component ensures that users trying the unknown routes to the Signin page.
                    element = {<Signin />} 
                    />
                    <Route
                    exact 
                    path = '/dashboard'
                    element = {<Dashboard />} 
                    />
                    <Route
                    exact 
                    path = '/community'
                    element = {<Community />} 
                    />
                    <Route
                    exact 
                    path = '/newblog'
                    element = {<NewBlog />} 
                    />
                </Routes>
            </Router>

        </div>
    )

    
}





export default App