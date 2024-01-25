import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ setOffset, offset }) => {

    const sidebarRef = useRef(null);
    const isMobile = useSelector(state => state.isMobile);
    const isSidebarActive = useSelector(state => state.isSidebarOpen);

    useEffect(() => {
        if (isMobile) return setOffset(pre => ({...pre, left: 0}));;
        setOffset(pre => ({...pre, left: sidebarRef.current.clientWidth}));
    }, [isMobile])

    return (
        <section className="sidebar" ref={sidebarRef} style={{paddingTop: `${offset.top}px`}}>
            <ul className={`side-menu ${isMobile ? '' : 'active'} ${isSidebarActive ? 'active' : ''}`} id="side-menu">
                <li>
                    <Link to='/'><i className='bx bx-home'></i><span> Home</span></Link>
                </li>
                <li>
                    <Link to='/home'><i className='bx bxs-dashboard'></i> <span> Dashboard</span></Link>
                </li>
                <li>
                    <Link to='/onlinePayment'><i className='bx bx-wifi'></i> <span> Online Payment</span></Link>
                </li>
                <li>
                    <Link to='/paymentDetails'><i className='bx bx-notepad'></i> <span> Payment Details</span></Link>
                </li>
                <li>
                    <Link to='/paymentEntry'><i className='bx bxs-edit'></i> <span> Payment Entry</span></Link>
                </li>
            </ul>
        </section>
    )
}
  
export default Sidebar;


