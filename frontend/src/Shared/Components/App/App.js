import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import Intern from "../../../Modules/Intern/Intern";
import User from "../../../Modules/User/User";
import Login from "../Login/Login";
// import { AuthService } from "../../";
// import { ROLE } from "../../../Constances/const";

class App extends React.Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <Switch>
          <Route path={`${path}/app/user`} component={User} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
