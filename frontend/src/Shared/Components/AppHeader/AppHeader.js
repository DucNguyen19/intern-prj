import React from "react";
// { Fragment }
import { withRouter } from "react-router-dom";
// import {
//   Nav,
//   NavItem,
//   Dropdown,
//   DropdownItem,
//   DropdownToggle,
//   DropdownMenu,
//   NavLink,
//   Col,
//   Row,
// } from "reactstrap";
import { EQUAL_ARRAY, ROLE } from "../../../Constances/const";
import  AuthService from '../../Services/AuthService';
import Navbar from "./navbar/navbar";
class AppHeader extends React.Component {
  state = {
    dropdownUserOpen: false,
    dropdownMasterDataOpen: false,
    dropdownInventoryOpen: false,
  };

  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }

  toggleUser = () => {
    this.setState({
      dropdownUserOpen: !this.state.dropdownUserOpen,
    });
  };

  toggleMasterData = () => {
    this.setState({
      dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
    });
  };

  toggleWareHouse = () => {
    this.setState({
      dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
    });
  };

  logout() {
    AuthService.userInfo = null;
    window.sessionStorage.clear();
    window.location.replace("login");
  }

  render() {
    return (
      <div>
        <Navbar/>
      </div>
    );
  }
}

export default withRouter(AppHeader);
