import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loaderToggled } from "../slices";
import { getUrl } from "./utils/utilities";


const SchedulePayment = ({ EncSessionId }) => {

    const [data, setData] = useState({CompanyMaster: {}, PGPayments: {}});
    const compCode = useSelector(state => state.compCode);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);           

    useEffect(() => {
        if (!user.PartyCode || !EncSessionId) return;
        const getData = async () => {
            dispatch(loaderToggled(true));                     
            let res = await getUrl(`/api/PGPayment?PartyCode=${user.PartyCode}&EncSessionId=${EncSessionId}&CID=${compCode}`);
            dispatch(loaderToggled(false));
            if (!res) return;
            setData(res);
        }
        getData();
    }, [compCode, dispatch, user, EncSessionId])            

    return (
        <section className="schedule_payment">
            <div className="table-wrapper w-100">    
                <table className='basic_table list-table w-100 print-table'>
                    <tbody>
                        <tr className="info personal-info">
                            <td colSpan={2}>
                                <div className="d-flex align-items-start gap-4">
                                    <table className="basic_table list-table">
                                        <tbody>
                                            <tr className="info">
                                                <td className="p-0">
                                                    <img src={`https://erp.gsterpsoft.com/Content/CompanyLogo/${data.CompanyMaster.LogoUrl}`} alt="Logo" style={{maxHeight: '13.8em'}}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table className="basic_table list-table w-100">
                                        <tbody>
                                            <tr className="info">
                                                <th colSpan={2} className="table-heading text-uppercase text-center" style={{padding: '0.3em 1em 0.2em', wordSpacing: '4px'}}>
                                                    {data.CompanyMaster.COMPNAME}
                                                </th>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Address:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.CompanyMaster.ADDRESS}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td>
                                                    <p>Contact:</p>
                                                </td>
                                                <td>
                                                    <h5>{data.CompanyMaster.CONTACT1}</h5>
                                                </td>
                                            </tr>
                                            <tr className="info">
                                                <td className="border-0">
                                                    <p>Mail:</p>
                                                </td>
                                                <td className="border-0">
                                                    <h5>{data.CompanyMaster.MAILID}</h5>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <h5>Receipt No: &nbsp;&nbsp;&nbsp;{data.PGPayments.ReceiptNo}</h5>
                            </td>
                            <td className="fees text-end">
                                <h5 className="fw-bold">Receipt Date: &nbsp;&nbsp;&nbsp;{data.PGPayments.ReceiptDate?.substr(0, 10).split('-').reverse().join('/')}</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td colSpan={2}>
                                <h5>Received with thaks from Mr./Ms {data.PGPayments.PartyName}</h5>
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
                                        {data.PGPayments.PGPaymentDetailsCollection?.map((i, n) => (
                                            <tr className="info" key={n}>
                                                <td>
                                                    <p>{n+1}</p>
                                                </td>
                                                <td>
                                                    <h5>{i.FeesDesc} - {i.DeptShortName}</h5>
                                                </td>
                                                <td className="text-end">
                                                    <p>{i.PaidAmt}</p>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="fees-row">
                                            <td className="fees" colSpan={2}>
                                                <p>Total</p>
                                            </td>
                                            <td className="fees text-end">
                                                <h5 className="fw-bold">{data.PGPayments.Amount}</h5>
                                            </td>
                                        </tr>
                                        <tr className="fees-row">
                                            <td className="fees text-wrap border-0" colSpan={2}>Amount in Words</td>
                                            <td className="fees text-end border-0">
                                                <h5 className="fw-bold"> {data.PGPayments.AmountInWords}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <h5>By &nbsp;{data.PGPayments.PaymentMode} {data.PGPayments.BankDesc}</h5>
                            </td>
                            <td className="text-end">
                                <h5 className="fw-bold">Transaction Reference No: &nbsp;&nbsp;&nbsp;{data.PGPayments.BankInstrumentNo}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="text-row">
                                    <p>
                                        Judicial proceedings regarding any matter related to <span className="text-primary">{data.CompanyMaster.COMPNAME}</span> will
                                        be decided solely in the relevant court of Kolkata, West Bengal, India.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot />
                </table>
            </div>
        </section>
    )
}

export default SchedulePayment;

