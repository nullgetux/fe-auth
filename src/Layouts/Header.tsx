import React from "react";
import Link from "next/link";
import Image from "next/image";
//import images
import navCardBg from "@assets/images/layout/nav-card-bg.svg";
import logoDark from "@assets/images/logo-dark.svg";
import logoLight from "@assets/images/logo-white.svg";
import avatar1 from "@assets/images/user/avatar-1.jpg";
import SimpleBar from "simplebar-react";
import { menuItems } from "./MenuData";
import NestedMenu from "./NestedMenu";
import { Dropdown } from "react-bootstrap";

const Header = ({ themeMode,sidebarTheme }: any) => {
  return (
    <React.Fragment>
      <nav className="pc-sidebar" id="pc-sidebar-hide">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link href="/" className="b-brand text-primary">
              {themeMode && sidebarTheme === "dark" ?
                <Image src={logoLight} alt="logo" className="logo-lg landing-logo"  priority={true}/>
                :
                <Image src={logoDark} alt="logo" className="logo-lg landing-logo" priority={true}/>
              }
              <span className="badge bg-brand-color-2 rounded-pill ms-2 theme-version">
                v1.2.0
              </span>
            </Link>
          </div>
          {/* <div className="navbar-content"> */}
          <SimpleBar className="navbar-content" style={{ maxHeight: "100vh" }}>
            <ul className="pc-navbar" id="pc-navbar">
              {/* Sidebar  */}
              <NestedMenu menuItems={menuItems} />
            </ul>
            <div className="card nav-action-card bg-brand-color-4">
              <div
                className="card-body"
                style={{ backgroundImage: `url(${navCardBg})` }}
              >
                <h5 className="text-dark">Help Center</h5>
                <p className="text-dark text-opacity-75">
                  Please contact us for more questions.
                </p>
                <Link
                  href="https://phoenixcoded.support-hub.io/"
                  className="btn btn-primary"
                  target="_blank"
                >
                  Go to help Center
                </Link>
              </div>
            </div>
          </SimpleBar>
          {/* </div> */}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
