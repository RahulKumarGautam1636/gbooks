import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loaderToggled, modalToggled } from "../slices";
import { CustomModal, getUrl, MyModal, OrderSuccess } from "./utils/utilities";
import axios from "axios";


const PaymentEntry = () => {

    const params = useParams();
    const [data, setData] = useState({AccPartyMasterList: [], DirectSales: {}, PGList: []});
    const compCode = useSelector(state => state.compCode);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [successModal, setSuccessModal] = useState(false);
    const [selectedPGateway, setSelectedPGateway] = useState({ CodeId: '', CodeValue: '', Description: '', KeyId: '', KeySecret: '' });
    const [consent, setConsent] = useState(false);    
    const modals = useSelector(state => state.modals);           

    useEffect(() => {
        if (!user.PartyCode || !params.orderId || !params.billType) return;
        const getData = async () => {
            dispatch(loaderToggled(true));                      
            let res = await getUrl(`/api/PGPayment?ProvBillId=${params.orderId}&PartyCode=${user.PartyCode}&CID=${compCode}&LOCID=${user.LocationId}&FID=${user.FinYear}&BillType=${params.billType}`);
            dispatch(loaderToggled(false));
            if (!res) return;
            setData(res);
        }
        getData();
    }, [compCode, dispatch, user, params.orderId, params.billType])            // using params object as dependency causes infinite loop. look for use-deep-compare-effect on npm.

    const handleSelect = (id) => {
        if (id === 'select') return setSelectedPGateway({ CodeId: '', CodeValue: '', Description: '', KeyId: '', KeySecret: '' });          // reset
        let selected = data.PGList.find(i => i.CodeValue === id);
        setSelectedPGateway({ CodeId: selected.CodeId, CodeValue: selected.CodeValue, Description: selected.Description, KeyId: selected.KeyId, KeySecret: selected.KeySecret });
    }

    const initPayment = async () => { 
        if (!consent) return alert('Please agree with the declaration.');    
        if (!selectedPGateway.KeyId) return alert('Please choose a Payment Gateway to continue..');
        if (!data.DirectSales.BillId) return alert('Error, No Bill ID received.');
        if (!user.PartyCode || !user.UserId) return alert('Invalid User.');
        if (!compCode) return alert('Invalid Company ID.');
        const paymentData = {
            EncCompanyId: compCode,
            LocationId: user.LocationId,
            FinYear: user.FinYear,
            PartyCode: user.PartyCode,
            UserId: user.UserId,
            DeptId: user.DeptId,
            ProvBillId: data.DirectSales.BillId,
            ScheduleOrService: params.billType,
            PGPayments: { 
                BankCode: selectedPGateway.CodeId,
                PGateWayMID: selectedPGateway.CodeValue,
                PGateWayKeyId: selectedPGateway.KeyId,
                PGateWayKeySecret: selectedPGateway.KeySecret,
                PaymentMode: 'PG'
            }
        }

        const status = await getPaymentOptions(paymentData);
        if (status) {
            const options = { 
                RazorPayAPIKey: status.PGPayments.PGateWayKeyId,
                RazorPaySecret: status.PGPayments.PGateWayKeySecret,
                Amount: status.Amount,                                      
                Currency: status.Currency,
                Name: status.Name,
                RemarksDescription: status.RemarksDescription,
                OrderId: status.OrderId,
                Email: status.Email,
                Mobile: status.Mobile,
                RegNo: status.RegNo,
                Trackid: status.Trackid,
                PartyCode: status.PartyCode,
                LocationId: status.LocationId,
                FinYear: 10,                                           // hardcode FinYear, replace with status.FinYear
                EncCompanyId: status.EncCompanyId,
                UserId: status.UserId,
                BillType: status.ScheduleOrService
            };
            console.log(options);
            makePaymentRequest(options);
        }   
    }

    const getPaymentOptions = async (params) => {
        if (!params.PartyCode) return alert('Error, no Party code found.');
        try {
            dispatch(loaderToggled(true));
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/PGPayment`, params);
            dispatch(loaderToggled(false));
            console.log(res);
            if (res.status === 200) {
                return res.data;
            }      
        } catch (err) {
            dispatch(loaderToggled(false));
            alert(err.message);
            return false;
        }
    } 
    
    const makePaymentRequest = (i) => {
        if (!i.Amount || isNaN(i.Amount)) return alert('Invalid amount, cannot proceed to payment.');
        var options = {
            key: i.RazorPayAPIKey,
            amount: i.Amount,
            currency: i.Currency,
            name: i.Name,
            description: i.RemarksDescription,
            order_id: i.OrderId,
            handler: function(response) { 
                handleSuccess({ ...response, ...i });
            },
            prefill: {
                "name": i.Name,
                "email": i.Email,
                "contact": i.Mobile                                       
            },
            notes: {
                "regno": i.RegNo,
                "name": i.Name,
                "base_amount": i.Amount,
                "TrackId": i.Trackid
            },
            theme: { "color" : "#0677bc" }
        };      
        console.log(options);
        const razor = new window.Razorpay(options);
        razor.open(); 
    }

    async function handleSuccess(res) {
        console.log(res);
        const isValid = await getUrl(`/api/PGPayment?paymentId=${res.razorpay_payment_id}&orderId=${res.razorpay_order_id}&trackId=${res.Trackid}&CompId=${res.EncCompanyId}&PartyCode=${res.PartyCode}&StudentAxisKeyId=${res.RazorPayAPIKey}&StudentAxisKeySecret=${res.RazorPaySecret}&LID=${res.LocationId}&FID=${res.FinYear}&UID=${res.UserId}&BillType=${res.BillType}`);
        console.log(isValid);
        if (isValid === 'Y') {
            setSuccessModal(true);
        } else {
            alert('An Error Occured while saving your payment.');
        }
    }

    const handleRedirect = () => {
        setSuccessModal(false);
        navigate('/paymentHistory');
    }

    return (
        <section className="payment_entry">
            <div className="table-wrapper">     {/* style={{ border: "1px solid #00a9ff", padding: "0.2em 1.2em 1.2em" }} */}
                <table className='basic_table list-table'>
                    <thead>
                        <tr>
                            <th colSpan={2} className="table-heading">
                                {/* Application No. <span style={{ color: "red" }}>23ECE070</span>. Please keep it safe for further prorcess. */}
                                PAYMENT DETAILS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="info personal-info">
                            <td colSpan={2}>
                                <div className="d-flex align-items-start flex-column flex-lg-row gap-0 gap-lg-4">
                                    <table className="basic_table list-table w-100">
                                        <tbody>
                                            <tr className="info">
                                                <td>
                                                    <p>Course:</p>
                                                </td>
                                                <td>
                                                    <h5>Electronics &amp; Communication Engineering</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Name</p>
                                                </td>
                                                <td>
                                                    <h5>{data.AccPartyMasterList[0]?.Name}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Email ID:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.AccPartyMasterList[0]?.Email}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Zip/Pin code:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.AccPartyMasterList[0]?.Pin}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td className="mobileNo border-0">
                                                    <p>Mobile No:</p>
                                                </td>
                                                <td className="mobileNo border-0">
                                                    <h5>{data.AccPartyMasterList[0]?.RegMob1}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="basic_table list-table w-100">
                                        <tbody>
                                            <tr className="info">
                                                <td>
                                                    <p>Department Details:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.AccPartyMasterList[0]?.DoctName}, {data.AccPartyMasterList[0]?.DepartmentName}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Sem / Year:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.AccPartyMasterList[0]?.BedInfo}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td className="border-0">
                                                    <p>Admission Date:</p>
                                                </td>
                                                <td className="border-0">
                                                    <h5>{data.AccPartyMasterList[0]?.AdmissionDate.substr(0, 10).split('-').reverse().join('/')}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr className="fees-row">
                            <td className="fees">
                                <h5>Fees Description</h5>
                            </td>
                            <td className="fees text-end">
                                <h5 className="fw-bold">Fees Amount(INR)</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td colSpan={2} style={{fontSize: '1.05em'}}>
                                <table className="w-100 basic_table list-table">
                                    <thead>
                                        <tr>
                                            <th>SL No.</th>
                                            <th>Fees Description</th>
                                            <th className="text-end">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.DirectSales?.SalesDetails?.map((i, n) => (
                                            <tr className="info" key={i.AutoId}>
                                                <td>
                                                    <p>{n+1}</p>
                                                </td>
                                                <td>
                                                    <h5>{i.Description}</h5>
                                                </td>
                                                <td className="text-end">
                                                    <p>{parseFloat(i.Amount).toFixed(2)}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="fees-row">
                                            <td className="fees" colSpan={2}>
                                                <p>Total</p>
                                            </td>
                                            <td className="fees text-end">
                                                <h5 className="fw-bold">{parseFloat(data.DirectSales.Amount).toFixed(2)}</h5>
                                            </td>
                                        </tr>
                                        <tr className="fees-row">
                                            <td className="fees text-wrap border-0" colSpan={2}>Amount in Words</td>
                                            <td className="fees text-end border-0">
                                                <h5 className="fw-bold"> {data.AmountInWords}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="paymentMode">
                                    <div className="d-flex gap-4 align-items-center">
                                        <p>Payment Mode:</p>
                                        <h5>
                                            <select name="">
                                                <option value="PG">ONLINE</option>
                                            </select>
                                        </h5>
                                    </div>
                                    <div className="d-flex gap-4 align-items-center">
                                        <p>Payment Gateway:</p>
                                        <h5>
                                            <select name="selectedPGateway" onChange={(e) => handleSelect(e.target.value)}>
                                                <option value="select">-Select-</option>
                                                {data.PGList.map(i => (<option key={i.CodeValue} value={i.CodeValue}>{i.Description}</option>))}
                                            </select>
                                        </h5>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="d-flex gap-5 align-items-start text-row">
                                    <input type="checkbox" onChange={() => setConsent(!consent)} style={{marginTop: '0.5em'}}/>
                                    <p onClick={() => dispatch(modalToggled({ name: 'PARTNER_FORM', status: true, data: '' }))}>
                                        I declare that to the best of my knowledge and belief the
                                        information given above are the correct and complete in all respect.
                                        In the event of being found otherwise, I shall abide by the decison
                                        of the institute to summarily reject my application. I also
                                        undertake to make the payment, which is non-refundable and agree to
                                        abide by the rules and regulations framed by the council applicable
                                        to the student admitted.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="py-3">
                                <button onClick={initPayment} className="btn-1" style={{fontSize: '1.1em'}}>SAVE</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot />
                </table>
            </div>
            <CustomModal isActive={successModal} name={'local-modal-code'} handleClose={handleRedirect} customClass={'order-success-modal'}>
                <OrderSuccess />
            </CustomModal>
            {modals.PARTNER_FORM.status && <MyModal name='PARTNER_FORM' customClass='partner-form' child={<OrderSuccess />}/>}
        </section>
    )
}

export default PaymentEntry;

