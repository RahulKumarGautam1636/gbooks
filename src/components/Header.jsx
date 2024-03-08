import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sideBarToggled } from "../slices";
import { logOut } from "./utils/utilities";


const Header = ({ setOffset }) => {

    const sidebarRef = useRef(null);
    const dispatch = useDispatch();
    const isSidebarActive = useSelector(state => state.isSidebarOpen);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setOffset(pre => ({...pre, top: sidebarRef.current.clientHeight}));
    }, [])

    return (
        <header ref={sidebarRef}>
            <nav>
                <ul className="header-nav">
                    <li>
                        <div className="toggler-box d-flex align-items-center">
                            <span onClick={() => dispatch(sideBarToggled(!isSidebarActive))} id="menu-toggler"><i className='bx bx-menu'></i></span>
                            <svg style={{fontSize: '0.8em'}} className="brand-logo logo" viewBox="0 0 148 148" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="74.38" cy="74.2227" r="73.4891" fill="var(--clr-primary)"/>
                                <circle cx="73.5556" cy="74.6983" r="49.105" fill="hsla(var(--hue), var(--sat), 36%)"/>
                                <path d="M112.189 25.1337L95.2884 25.1337C92.2248 25.1337 82.4456 24.6743 70.7797 25.1337C56.6587 25.6898 46.3554 31.9564 38.1805 39.8393C30.0057 47.7222 20.517 62.904 24.3125 84.363C28.108 105.822 45.1876 118.96 58.1797 122.61C71.1719 126.259 89.4194 127.135 107.667 110.785C122.265 97.7056 123.601 77.1291 122.445 68.4759H73.5166C70.5378 68.6066 64.4705 70.7027 64.0314 78.0415C63.5924 85.3804 70.1719 88.1001 73.5166 88.5426H99.5128C91.9502 104.011 77.9364 105.3 71.3681 105.3C61.4056 105.3 42.536 96.7496 43.2235 74.5777C43.911 52.4057 62.273 45.7169 71.3681 45.144H112.189C115.626 45.2872 122.501 43.5971 122.501 35.6908C122.501 27.7845 115.626 25.2053 112.189 25.1337Z" fill="white"/>
                                <circle cx="112.918" cy="35.1902" r="10" fill="#FFB100"/>
                                <circle cx="73.5556" cy="78.5115" r="10" fill="#FFB100"/>
                            </svg>
                            <h3 className="compName">State Medical Faculty of West Bengal</h3>
                        </div>
                    </li>
                    <li className="d-none d-md-block">
                        <div className="input-group header-search">
                            <input type="text" className="form-control border-0" placeholder="Search" aria-label="Amount (to nearest dollar)" />
                            <button className="input-group-text border-0"><i className='bx bx-search'></i></button>
                        </div>
                    </li>
                    {/* <li className="ms-auto">
                        <Link className="h-pill" to="#"><i className='bx bx-cross'></i></Link>
                    </li>
                    <li>
                        <Link className="h-pill" to="#"><i className='bx bx-box'></i></Link>
                    </li>
                    <li>
                        <Link className="h-pill position-relative" to="#">
                            <i className='bx bx-bell'>
                                <span id="cart-badge" className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{fontSize: '0.55em', fontFamily: 'Nunito', background: '#e44dff', display: 'block'}}>2</span>
                            </i>
                        </Link>
                    </li> */}
                    {isLoggedIn && <li className="ms-auto">
                        <div className="dropdown user-dropdown">
                            <Link to="#" id="dropdownLink" data-bs-toggle="dropdown" aria-expanded="false"><img src="assets/img/user.png" alt="user"/>
                                <span className="d-none d-md-block text-dark">{user.UserFullName}</span>
                                <i className="bx bxs-down-arrow toggler"></i>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropdownLink">
                                <Link to="#" className="dropdown-item d-block d-md-none">{user.UserFullName}</Link>
                                <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                                <Link to="#" className="dropdown-item" onClick={() => logOut(navigate)}>Logout</Link>
                                {/* <Link to="#" className="dropdown-item">Third item</Link> */}
                            </div>
                        </div>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default Header;