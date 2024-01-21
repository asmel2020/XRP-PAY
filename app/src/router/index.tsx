
import { Route, Switch } from "wouter";
import { Login, Payment, Register, User } from "../pages";


const Router = () => {
  return (
    <Switch>
      <Route path="/" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/payment/:id" component={Payment} />
      <Route>404, Not Found!</Route>
    </Switch>
  );
};
export default Router;
