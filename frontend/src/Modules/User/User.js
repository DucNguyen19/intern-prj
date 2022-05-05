import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Users from '../User/Component/UserForm'
class User extends Component {
    render() {
      const { path } = this.props.match;
      return (
        <div className="user">
          <Switch>
            <Route path={`${path}/users`} component={Users} />
            
          </Switch>
        </div>
      );
    }
  }
  
  export default User;