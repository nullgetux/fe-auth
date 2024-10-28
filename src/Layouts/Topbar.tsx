import { THEME_MODE } from "../Common/layoutConfig";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SimpleBar from "simplebar-react";

// Import images
import avatar1 from "../assets/images/user/avatar-1.jpg";
import avatar2 from "../assets/images/user/avatar-2.jpg";
import avatar3 from "../assets/images/user/avatar-3.jpg";

interface HeaderProps {
    themeMode?: string; // Define the type for themeMode
    changeThemeMode?: any; // Define the type for changeThemeMode function
    toogleSidebarHide?: () => void;
    toogleMobileSidebarHide?: () => void;
    handleOffcanvasToggle?: () => void;
}

const TopBar = ({ handleOffcanvasToggle, changeThemeMode, toogleSidebarHide, toogleMobileSidebarHide }: HeaderProps) => {

    const dispatch = useDispatch<any>();

    // Function to handle theme mode change
    const handleThemeChange = (value: any) => {
        dispatch(changeThemeMode(value));
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST", // Or "GET", depending on your API
                credentials: "include", // Include cookies for session
            });

            if (!response.ok) {
                throw new Error("Logout failed"); // Handle error
            }

            // Clear cookies or local storage
            // For example, if you're using cookies to store the token:
            document.cookie = "token=; path=/;";

            // Optionally, redirect to login page or homepage
            window.location.href = "/auth/login"; // or wherever you want to redirect
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <React.Fragment>
            <header className="pc-header">
                <div className="header-wrapper">
                    <div className="me-auto pc-mob-drp">
                        <ul className="list-unstyled">
                            <li className="pc-h-item pc-sidebar-collapse">
                                <Link href="#" className="pc-head-link ms-0" id="sidebar-hide" onClick={toogleSidebarHide}>
                                    <i className="ti ti-menu-2"></i>
                                </Link>
                            </li>
                            <li className="pc-h-item pc-sidebar-popup">
                                <Link href="#" className="pc-head-link ms-0" id="mobile-collapse" onClick={toogleMobileSidebarHide}>
                                    <i className="ti ti-menu-2"></i>
                                </Link>
                            </li>
                            <Dropdown as="li" className="pc-h-item d-inline-flex d-md-none">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none m-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-magnifying-glass"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="pc-h-dropdown drp-search">
                                    <form className="px-3">
                                        <div className="form-group mb-0 d-flex align-items-center">
                                            <input type="search" className="form-control border-0 shadow-none" placeholder="Search here. . ." />
                                            <button className="btn btn-light-secondary btn-search">Search</button>
                                        </div>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                            <li className="pc-h-item d-none d-md-inline-flex">
                                <form className="form-search">
                                    <i className="ph-duotone ph-magnifying-glass icon-search"></i>
                                    <input type="search" className="form-control" placeholder="Search..." />
                                    <button className="btn btn-search" style={{ padding: "0" }}><kbd>ctrl+k</kbd></button>
                                </form>
                            </li>
                        </ul>
                    </div>

                    <div className="ms-auto">
                        <ul className="list-unstyled">
                            <Dropdown as="li" className="pc-h-item">
                                <Dropdown.Toggle as="a" className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false">
                                    <i className="ph-duotone ph-sun-dim"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end pc-h-dropdown">
                                    <Dropdown.Item onClick={() => handleThemeChange(THEME_MODE.DARK)}>
                                        <i className="ph-duotone ph-moon"></i>
                                        <span>Dark</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleThemeChange(THEME_MODE.LIGHT)}>
                                        <i className="ph-duotone ph-sun-dim"></i>
                                        <span>Light</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleThemeChange(THEME_MODE.DEFAULT)}>
                                        <i className="ph-duotone ph-cpu"></i>
                                        <span>Default</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown as="li" className="pc-h-item header-user-profile">
                                <Dropdown.Toggle className="pc-head-link arrow-none me-0" data-bs-toggle="dropdown" href="#"
                                    aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false" style={{ border: "none" }}>
                                    <Image src={avatar2} alt="user-image" width={40} className="user-avtar" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                                        <h4 className="m-0">Profile</h4>
                                    </div>
                                    <div className="dropdown-body">
                                        <SimpleBar className="profile-notification-scroll position-relative" style={{ maxHeight: "calc(100vh - 225px)" }}>
                                            <ul className="list-group list-group-flush w-100">
                                                <li className="list-group-item">
                                                    <div className="d-flex align-items-center">
                                                        <div className="flex-shrink-0">
                                                            <Image src={avatar2} alt="user-image" width={50} className="wid-50 rounded-circle" />
                                                        </div>
                                                        <div className="flex-grow-1 mx-3">
                                                            <h5 className="mb-0">Carson Darrin</h5>
                                                            <a className="link-primary" href="mailto:carson.darrin@company.io">carson.darrin@company.io</a>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item" onClick={handleLogout}>
                                                    <Dropdown.Item>
                                                        <span className="d-flex align-items-center">
                                                            <i className="ph-duotone ph-power"></i>
                                                            <span>Logout</span>
                                                        </span>
                                                    </Dropdown.Item>
                                                </li>
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ul>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};

export default TopBar;
