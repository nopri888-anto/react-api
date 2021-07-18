import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Product from "./pages/Product";
import Addproduct from "./pages/Addproduct";
import Editproduct from "./pages/Editproduct";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/add-product" component={Addproduct} />
        <Route path="/edit-product/:id" component={Editproduct} />
      </Switch>
    </Router>
  );
}

export default App;
