import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_BILL, getUrl } from "./utils/utilities";
import { loaderToggled } from "../slices";
import { Link } from "react-router-dom";

const ManageServices = () => {

    const [data, setData] = useState({DirectSalesCollection: []});
    const compCode = useSelector(state => state.compCode);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (!user.PartyCode) return;
        const getData = async () => {
            dispatch(loaderToggled(true));
            let res = await getUrl(`/api/PGPayment?page=1&PageSize=20&PartyCode=${user.PartyCode}%20&CID=${compCode}&LOCID=${user.LocationId}`);
            dispatch(loaderToggled(false));
            if (!res) return;
            setData(res);
        }
        getData();
    }, [compCode, dispatch, user])

    const handleDelete = async (billId) => {
        console.log(billId);
        if (!user.UserId) return;
        dispatch(loaderToggled(true));
        let res = await getUrl(`/api/PGPayment?OrderId=${billId}&CID=${compCode}&UID=${user.UserId}`);
        dispatch(loaderToggled(false));
        if (res === 'Y') {
            alert('Order deleted successfully.');
            // window.location.reload();
            getData();
        }
    }
    
    const handlePay = (id) => {
        console.log(id);
    }

    const getData = async () => {
        dispatch(loaderToggled(true));
        let res = await getUrl(`/api/PGPayment?page=1&PageSize=20&PartyCode=${user.PartyCode}%20&CID=${compCode}&LOCID=${user.LocationId}`);
        dispatch(loaderToggled(false));
        if (!res) return;
        setData(res);
    }

    return (
        <section className="manage_services">
            <div className="row h-100">
                <div className="col-12">
                    <h2 className="heading-primary"><i className="bx bx-wifi icon-badge" style={{'--icon-bg': '#70f8ff', '--icon-border': '#dd51ff', fontSize: '0.9em', padding: '0.25em', color: 'rgb(255 12 135)'}}></i> Online Fees Payment</h2>
                    <div className="table-wrapper overflow-auto">
                        <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col">Order No.</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Party Name</th>
                                    <th scope="col" className="text-end">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-center">Pay</th>
                                    <th scope="col" className="text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.DirectSalesCollection.map(i => (
                                    <tr key={i.BillId}>
                                        <td>{i.VchNo}</td>
                                        <td>{i.VchDate.slice(0, 10).split('-').reverse().join('/')}</td>
                                        <td>{i.PartyName}</td>
                                        <td className="text-end">{parseFloat(i.Amount).toFixed(2)}</td>
                                        <td>{i.BillStatus}</td>
                                        <td className="text-center">
                                            {/* <button style={{fontSize: '0.9em'}} onClick={() => handlePay(i.BillId)} className="btn-1">PAY</button> */}
                                            <Link to={`/paymentEntry/${i.BillId}/${ORDER_BILL}`}><i className="bx bx-money del-icon" onClick={() => handlePay(i.BillId)} role="button" title="Pay Now" style={{fontSize: '1.6em', verticalAlign: 'middle', color: '#1ab500'}}></i></Link>
                                        </td>
                                        <td className="text-center">
                                            <i className="bx bx-x-circle del-icon" onClick={() => handleDelete(i.BillId)} role="button" title="Delete"></i>
                                        </td>
                                    </tr>
                                ))}                            
                            </tbody>
                        </table>
                    </div>

















                    {/* <div className="table-wrapper overflow-auto">
                        <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2}>Enrollment No: 23ECE070</th>
                                    <th scope="col">Roll / Index: 23ECE070</th>
                                    <th scope="col" colSpan={2}>Student Name: AYUSHMAN SIKDER</th>
                                    <th scope="col" colSpan={2}>Mobile No: 7439623633</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SL No.</td>
                                    <td>Session</td>
                                    <td>Course Name</td>
                                    <td>Schedule No</td>
                                    <td>Due Date</td>
                                    <td>Schedule Amount</td>
                                    <td>Action</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2023-2027</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>Semester-3</td>
                                    <td>15/06/2024</td>
                                    <td>47,000.00</td>
                                    <td><button style={{fontSize: '0.9em'}} className="btn-1">PAY</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2023-2027</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>Semester-3</td>
                                    <td>15/06/2024</td>
                                    <td>47,000.00</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default ManageServices;