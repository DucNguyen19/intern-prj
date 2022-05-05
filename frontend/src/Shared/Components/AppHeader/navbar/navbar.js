import "font-awesome/css/font-awesome.min.css";
import "./navbar.scss";
import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ModalConfirm from "../../ModalConfirm/ModalConfirm";
function Navbar() {
  const [className, setClassName] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleOpen = () => {
    setMessage("Ban Co Muon Dang Xuat ?");
  };
  const answer = (answer) => {
    if (answer) {
      sessionStorage.clear();
      window.location.href = "/login";
    } else {
      setMessage("");
    }
  };
  return (
    <div className="navbar2">
      <div className="navbar2Icon">
        <i
          onClick={() => setClassName(!className)}
          className="fa fa-bars"
          aria-hidden="true"
        ></i>
        <div className="account">
          <h4>Quản Lý Công Ty</h4>
          <div className="accountManage">
            <p>PH</p>
            <div className="hoverAccount">
              <div className="hoverAccountInfor">
                <div className="hoverAccountInforImage">
                  <p>PH</p>
                  <div className="content">
                    <p>Nguyễn Văn A</p>
                    <span>nguyenvana@gmail.com</span>
                  </div>
                </div>
              </div>
              <p className="borderBottom">Quản Lý Tài Khoản</p>
              <p className="borderBottom2" onClick={handleOpen}>
                Đăng Xuất
              </p>
            </div>
            <ModalConfirm message={message} answer={answer} />
          </div>
        </div>
      </div>
      <div
        className={clsx("navbar2Menu", {
          navbar2Menu2: !className,
          navbar2Menu3: className,
        })}
      >
        <ul
          className={clsx({
            list1: !className,
            list2: className,
          })}
        >
          <li>
            <i className="fa fa-home" aria-hidden="true"></i>
            <Link to="/home">Trang Chủ</Link>
          </li>
          <li>
            <i className="fa fa-home" aria-hidden="true"></i>
            <Link to="/home">Khám phá</Link>
          </li>
          <li>
            <i className="fa fa-home" aria-hidden="true"></i>
            <Link to="/home">Short</Link>
          </li>
          <li>
            <i className="fa fa-home" aria-hidden="true"></i>
            <Link to="/home">Kênh Đăng Ký</Link>
          </li>
          <li>
            <i className="fa fa-home" aria-hidden="true"></i>
            <Link to="/home">Thư Viện</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
