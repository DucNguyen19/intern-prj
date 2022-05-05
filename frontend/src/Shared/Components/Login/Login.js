import React, { Fragment } from "react";
import {
  Form as FormRender,
  FormGroup,
  Input,
  Button,
  Label,
  Row,
  Col,
} from "reactstrap";
import "./Login.scss";
import { LOCALSTORAGE } from "../../../Constances/const";
import AuthService from "../../Services/AuthService";
import Form from "../Form/Form";
import ModalNoti from "../ModalNoti/ModalNoti";

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      notiMessage: "",
      form: this._getInitFormData({ username: "", password: "" }),
    };
  }

  login() {
    const { username, password } = this.state.form;
    AuthService.login(username.value, password.value)
      .then((res) => {
        window.sessionStorage.setItem(LOCALSTORAGE.TOKEN, res.id);
        AuthService.getUserInfo()
          .then((_res) => {
            let user = _res;
            window.sessionStorage.setItem(
              LOCALSTORAGE.USER,
              JSON.stringify(user)
            );
            window.location.href = "/app";
          })
          .catch((err) => {
            console.log("Err", err);
            this.setState({
              notiMessage: "Đăng nhập thất bại kiểm tra lại tài khoản",
            });
            // alert("Đăng Nhập Thất Bại");
          });
      })
      .catch((err) => {
        console.log("Err", err);
        this.setState({
          notiMessage: "Có lỗi xảy ra trong lúc đăng nhập, xin thử lại sau!",
        });
        // alert("Có lỗi xảy ra trong lúc đăng nhập, xin thử lại sau!");
      });
  }
  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }
  onBackListLocation(url = "") {
    window.sessionStorage.removeItem(LOCALSTORAGE.LOCATION);
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }
  render() {
    const { username, password } = this.state;
    console.log(username, password);
    return (
      <div className="container">
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <div className="form-container">
              <div className="form-icon">
                <i class="fa fa-user"></i>
              </div>
              <h3 className="title">Đăng nhập</h3>
              <FormRender className="form-horizontal">
                <div className="form-group">
                  <Label>Tên đăng nhập</Label>
                  <Input
                    className="form-control"
                    value={username}
                    onChange={(ev) => this._setValue(ev, "username")}
                    type="email"
                    placeholder="username"
                  />
                </div>
                <div className="form-group">
                  <Label>Mật khẩu</Label>
                  <Input
                    value={password}
                    onChange={(ev) => this._setValue(ev, "password")}
                    className="form-control"
                    type="password"
                    placeholder="password"
                  />
                </div>
                <Button
                  type="button"
                  className="btn btn-default"
                  onClick={() => this.login()}
                >
                  Đăng nhập
                </Button>
              </FormRender>
            </div>
            <ModalNoti
              message={this.state.notiMessage}
              done={() => this.setState({ notiMessage: "" })}
            ></ModalNoti>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
