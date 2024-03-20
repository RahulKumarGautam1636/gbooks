import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isMobileToggled } from "../../slices";
import axios from "axios";
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import { createPortal } from 'react-dom';
import Modal from 'react-bootstrap/Modal';

export const handleNumberInputs = (e, setStateName, isPrimitive=false) => {
    const {name, value} = e.target;
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      if (isPrimitive) return setStateName(value);
      setStateName(preValue => {
          return {...preValue, [name]: value};
      });
    }
}

export const IsMobile = () => {                                             // Determines if device is mobile or desktop.

  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    dispatch(isMobileToggled(mediaQuery.matches));
    const handleMediaQueryChange = (e) => {
      dispatch(isMobileToggled(e.matches));
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return;
}

export const getOtp = async (name, phone) => {
  try {
      const res = await axios.get(`https://myapps.gsterpsoft.com/api/UserReg/0`, { params: { name: name, mob: phone } });
      if (res.status === 200) {
        return res.data;
      }
  } catch (error) {
      alert('An Error Occured, Try again later.');
      return false;            
  }
  // return '0000';
}

export const GlobalLoader = () => {
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();

export const decrypt = (data) => {
  if (!data) return false;
  if (data.length > 200) return false;
  var bytes  = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export const logOut = (navigate) => {
  navigate('/');
  sessionStorage.removeItem('siteData');
  window.location.reload();
}

// const ProtectedRoute = ({children}) => {
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   let location = useLocation();
//   if(!isLoggedIn) {
//       return <Navigate to="/" state={{from: location}} replace />       // changes location when rendered.
//   }
//   return children;
// };

// export default ProtectedRoute;

// export const getUrl = async (url) => {
//   try {
//     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
//     if (res.status === 200) {
//       return res.data;
//     }    
//   } catch (error) {
//     alert(error);
//     return false;
//   }
// }

export async function getUrl(url) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    if (res.status === 200) {
      return res.data;
    }    
  } catch (error) {
    console.log(error);
    alert('An error occured, Please try again later !');
    return false;
  }
}

export const PrintBox = ({ children, setPrint }) => {
  return createPortal(
    <div className="print-box">
      <div className="print-btn-box">
          <button className="btn-1 print-btn" onClick={() => setPrint(false)}>Back</button>
          <button className="btn-1 print-btn" onClick={() => window.print()}>Print</button>
      </div>
      {children}
    </div>
    , document.body
  );
}

export const wait = async (time) => await new Promise((resolve) => setTimeout(resolve, time));

export const ORDER_BILL = 'fY8HsZhNadnvQMnfvDxMrw==';
export const SCHEDULE_BILL = 'Ae1o9l0VVDAIACBHYvpWaA==';

export const CustomModal = ({ isActive=false, handleClose, name, customClass, fullscreen, children }) => {
  const handleHide = () => {
    if (name === 'local-modal') {
      handleClose(false);                         // for local state controlled modals.
    } else if (name === 'local-modal-code') {
      handleClose();                              // for local state controlled modals with addional line of code to run with modal hide.
    } else {
      handleClose(name, false);                   // for redux state controlled modals.
    }
  }
  return (
    <Modal show={isActive} fullscreen={fullscreen} className={customClass} onHide={handleHide} centered>
        <Modal.Body>
          {children}
        </Modal.Body>
    </Modal>
  )
}

export const OrderSuccess = () => {
  return (
    <section className="orderSuccess">
      <div className="outerDiv">
        <img className="img-fluid" src="../../assets/img/success.png" alt="" />
        <h3 className="heading-secondary mt-4" style={{fontSize: '3em', marginBottom: '0.4em', fontFamily: "Josefin sans"}}>Payment Successfull !</h3>
        <p>Successfully paid the amount.</p>
        <div className="d-flex justify-content-between flex-column flex-lg-row gap-4 align-items-center">
          <Link to='/manageServices' className="btn-1">MANAGE SERVICES</Link>
          <Link to='/paymentHistory' className="btn-1">PAYMENT HISTORY</Link>
        </div>
      </div>
    </section>
  )
}