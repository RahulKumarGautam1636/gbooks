import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sideBarToggled } from "../slices";

const Sidebar = ({ setOffset, offset }) => {

    const sidebarRef = useRef(null);
    const isMobile = useSelector(state => state.isMobile);
    const isSidebarActive = useSelector(state => state.isSidebarOpen);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMobile) return setOffset(pre => ({...pre, left: 0}));;
        setOffset(pre => ({...pre, left: sidebarRef.current.clientWidth}));
    }, [isMobile])

    const handleClick = () => {
        dispatch(sideBarToggled(false));
    }

    return (
        <section className="sidebar" ref={sidebarRef} style={{paddingTop: `${offset.top}px`}}>
            <ul className={`side-menu ${isMobile ? '' : 'active'} ${isSidebarActive ? 'active' : ''}`} id="side-menu">
                {!isLoggedIn && <li>
                    <Link onClick={handleClick} to='/'><i className='bx bx-home'></i><span> Login</span></Link>
                </li>}
                {isLoggedIn && <>
                <li>
                    <Link onClick={handleClick} to='/dashboard'><i className='bx bxs-dashboard'></i> <span> Dashboard</span></Link>
                </li>
                <li>
                    <Link onClick={handleClick} to='/manageServices'><i className='bx bx-wifi'></i> <span> Manage Services</span></Link>
                </li>
                <li>
                    <Link onClick={handleClick} to='/paymentHistory'><i className='bx bx-notepad'></i> <span> Payment History</span></Link>
                </li>
                </>}
            </ul>
        </section>
    )
}
  
export default Sidebar;


