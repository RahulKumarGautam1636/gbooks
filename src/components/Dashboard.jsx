import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_BILL, getUrl, handleNumberInputs, wait } from "./utils/utilities";
import { Link, useNavigate } from "react-router-dom";
import { loaderToggled } from "../slices";
import axios from "axios";

const Dashboard = () => {
    
    const user = useSelector(state => state.user);
    const compCode = useSelector(state => state.compCode);
    const [service, setService] = useState({ courseId: '', feesDescription: '', qty: 1 });
    const [serviceActive, setServiceActive] = useState(true);
    const [data, setData] = useState({AccPartyMasterList: [], CostCenterList: [], ItemMasterList: []});
    const [filteredFeesDescription, setFilteredFeesDescription] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [selectedFees, setSelectedFees] = useState({});           
    const [serviceRows, setServiceRows] = useState([]);
    const searchBoxRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleServiceInputs = (e) => {
        const { name, value } = e.target;
        setService(pre => ({ ...pre, [name]: value }));
    }

    useEffect(() => {
        if (!user.PartyCode) return;
        const getData = async () => {
            let res = await getUrl(`/api/PGPayment?PartyCode=${user.PartyCode}&CID=${compCode}&FID=${user.FinYear}&PTypeId=${user.PartyType}&PTypeDesc=${user.PartyTypeDesc}`);
            if (!res) return;
            setData(res);
        }
        getData();
    }, [compCode, user])                             // Using object as dependency poses chances of problems. look for use-deep-compare-effect on npm.
    
    useEffect(() => {
        if (!service.feesDescription) return setFilteredFeesDescription([]);
        const feesDesc = data.ItemMasterList.filter(i => i.Description.toLowerCase().includes(service.feesDescription.toLowerCase()));
        setFilteredFeesDescription(feesDesc);
    }, [service.feesDescription, data.ItemMasterList])

    useEffect(() => {
        const onBodyClick = (event) => {                                                                                        
            if (searchBoxRef.current && searchBoxRef.current.contains(event.target)) return;                                    // Return if click is triggered from serach-box div and it's inner elements.
            setFilteredFeesDescription([]);
        }                                                                                                                        
        document.body.addEventListener('click', onBodyClick, { capture: true });                                                // Add eventlistener on component mount.
        return () => document.body.removeEventListener('click', onBodyClick, { capture: true });                                // Remove Eventlistener on component unmount.
    }, [])

    const handleCourseSelect =  (id) => {
        const item = data.CostCenterList.find(i => i.SubCode === parseInt(id));
        setSelectedCourse(item);
    }

    const handleFeesSelect = async (item) => {
        dispatch(loaderToggled(true));
        const { ItemMaster } = await getUrl(`/api/PGPayment?ItemId=${item.ItemId}&CID=${compCode}&LID=${item.LocationId}&FID=${user.FinYear}&PTypeId=${user.PartyType}`);
        dispatch(loaderToggled(false));
        if (!ItemMaster) return;
        setService(pre => ({ ...pre, feesDescription: ItemMaster.Description }));
        setSelectedFees(ItemMaster);
        setFilteredFeesDescription([]);
    }

    const addServiceRow = (item) => {
        if (!selectedCourse?.SubCode) return alert('Please choose a course.');
        if (!item.ItemId) return alert('Please choose a Fees Description.');
        const ifItemExist = serviceRows.find(i => i.feesId === item.ItemId);
        if (ifItemExist) return alert('This Item is already added.');
        if (isNaN(service.qty) || service.qty < 1) return alert('Quantity must be a positive number.');
        setServiceRows(pre => ([ ...pre, { course: selectedCourse.Description, courseId: selectedCourse.SubCode, feesId: item.ItemId, feesDescription: item.Description, qty: service.qty, rate: item.SRate, amount: parseInt(service.qty) * parseFloat(item.SRate) }]));
        setService({ courseId: '', feesDescription: '', qty: 1 });
        setSelectedCourse({});
        setSelectedFees({});
    }

    const handleDelete = (id) => {
        let rows = serviceRows.filter(i => i.feesId !== id);
        setServiceRows(rows);
    }

    const totalAmount = serviceRows.map(i => i.amount).reduce((total, num) => total + num, 0).toFixed(2);
    
    const placeOrder = async () => {
        let orderItems = serviceRows.map(i => ({ DeptId: i.courseId, ItemId: i.feesId, BillQty: i.qty, DelStatus: 'N' }));
        let order = {
            EncCompanyId: compCode,
            LocationId: user.LocationId,
            FinYear: user.FinYear,
            PartyCode: user.PartyCode,
            PTypeId: user.PartyType,
            UserId: user.UserId,
            DirectSalesDetailsList: orderItems
        }
        const status = await makeOrderRequest(order);
        if (status) {
            await wait(500);
            navigate(`/paymentEntry/${status}/${ORDER_BILL}`);
        } else {
            alert('An Error Occured, Please try again later.');
        }
    }
    
    const makeOrderRequest = async (params) => {
        console.log(params);
        if (!params.UserId) return alert('Error, no user type found.');
        try {
            dispatch(loaderToggled(true));
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/PGOrder`, params);
            dispatch(loaderToggled(false));
            console.log(res);
            if (res.data[0] === 'Y') {
                return res.data[1];
            }      
        } catch (err) {
            dispatch(loaderToggled(false));
            console.log(err);
            return false;
        }
    }
    console.log('test');
    return (
        <section className="home">
            <div className="content-box h-100">
                <div className="pane-block pane-left">
                    <h2 className="heading-primary mt-0 mt-md-2">Payment Information</h2>
                    <div className="card-wrapper">
                        <div className="home-card" style={{'--bg': '#6351bd'}}>
                            <Link to='/schedulePayment'>
                                <h1><i className='bx bxs-hourglass icon-badge' style={{'--icon-bg': '#1c0e8f', '--icon-border': '#03A9F4'}}></i> Schedule Fees Payment</h1>
                            </Link>
                        </div>
                        <div className="home-card" style={{'--bg': '#f15a8b'}}>
                            <Link to='/manageServices'>
                                <h1><i className="bx bxs-edit icon-badge" style={{'--icon-bg': '#e9af00', '--icon-border': '#fff59b'}}></i> Manage Services</h1>
                            </Link>
                        </div>
                        <div className="home-card other-services" role="button" style={{'--bg': '#16bed9'}}>
                            <h1 onClick={() => setServiceActive(!serviceActive)}><i className="bx bxs-customize icon-badge" style={{'--icon-bg': '#b50092', '--icon-border': '#ff6ee3'}}></i> Other Services<i className='bx bxs-down-arrow toggler' style={{transform: serviceActive && 'translateY(-50%) rotate(180deg)'}}></i></h1>
                            {serviceActive && <div className="custom-dropdown">
                                <div className="table-wrapper overflow-auto pb-2">
                                    <table className="table basic_table list-table parent-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">SL</th>
                                                <th scope="col">Course</th>
                                                <th scope="col">Fees Description</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>*</td>
                                                <td>
                                                    <div className="form-group form-focus focused">
                                                        <select name="courseId" value={service.courseId} onChange={(e) => {handleServiceInputs(e);handleCourseSelect(e.target.value)}} required tabIndex="1" className="form-control floating" style={{width: 'fit-content'}}>
                                                            <option value="">-Select-</option>
                                                            {data.CostCenterList.map(item => (<option key={item.SubCode} value={parseInt(item.SubCode)}>{item.Description}</option>))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group form-focus focused">
                                                        <input name="feesDescription" value={service.feesDescription} onChange={handleServiceInputs} className="form-control floating txtUserMobile" placeholder="Search Fees" required tabIndex="1" type="text" autoComplete="off"/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group form-focus focused" style={{width: '4em'}}>
                                                        <input name="qty" value={service.qty} onChange={(e) => handleNumberInputs(e, setService)} className="form-control floating txtUserMobile" required tabIndex="1" type="text" autoComplete="off"/>
                                                    </div>
                                                </td>
                                                <td>{selectedFees.SRate}</td>
                                                <td>{selectedFees.SRate && parseInt(service.qty) * parseFloat(selectedFees.SRate)}</td>
                                                <td className="text-center" role="button" onClick={() => addServiceRow(selectedFees)}><i className='bx bx-plus-medical' style={{verticalAlign: 'sub'}}></i></td>
                                            </tr>
                                            {!filteredFeesDescription.length ? '' :  <tr>
                                                <td colSpan={7}>
                                                    <div className='auto-complete' ref={searchBoxRef}>
                                                        <ul>
                                                            {filteredFeesDescription.map((i, n) => <li key={i.ItemId}><Link to={`#`} onClick={() => handleFeesSelect(i)}>{i.Description}</Link></li>)}
                                                        </ul> 
                                                    </div>
                                                </td>
                                            </tr>}
                                            {serviceRows.map((i, n) => (
                                                <tr key={i.feesId}>
                                                    <td>{n+1}</td>
                                                    <td>{i.course}</td>
                                                    <td>{i.feesDescription}</td>
                                                    <td className="text-end">{i.qty}</td>
                                                    <td className="text-end">{i.rate}</td>
                                                    <td className="text-end">{i.amount}</td>
                                                    <td role="button" className="text-center" onClick={() => handleDelete(i.feesId)}><i className='bx bx-x-circle del-icon'></i></td>
                                                </tr>
                                            ))}
                                            {!serviceRows.length ? '' : <tr>
                                                <td colSpan={7}>
                                                    <div className="form-group form-focus focused ms-auto" style={{width: 'fit-content'}}>
                                                        <div className="input-group mt-3 mb-2">
                                                            <input type="text" className="form-control text-end" readOnly value={totalAmount} placeholder="Recipient's username" />
                                                            <span className="input-group-text" onClick={placeOrder} role="button" style={{background: '#00bcd4', border: '1px solid #00bcd4'}}><i style={{fontSize: '1.5em'}} className='bx bxs-chevrons-right text-white'></i></span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}
                        </div>
                        <div className="home-card history" style={{'--bg': '#25b972'}}>
                            <Link to='/paymentHistory'>
                                <h1><i className="bx bx-notepad icon-badge" style={{'--icon-bg': '#0090ad', '--icon-border': '#7de9ff'}}></i> Payment History</h1>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="pane-block pane-right">
                    <div>
                        <table className="table basic_table mb-0">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={4}>General Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Name :</th>
                                    <td>{user.UserFullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Course :</th>
                                    <td>ECE</td>
                                </tr>
                                <tr>
                                    <th scope="row">Session :</th>
                                    <td colSpan="2">2023 - 2027</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;