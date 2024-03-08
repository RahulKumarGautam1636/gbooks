import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrl } from "./utils/utilities";
import { loaderToggled } from "../slices";

const PaymentHistory = () => {

    const [data, setData] = useState({PGPaymentList: []});
    const compCode = useSelector(state => state.compCode);
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            dispatch(loaderToggled(true));
            let res = await getUrl(`/api/PGPayment?PartyCode=682977&CID=${compCode}`);
            dispatch(loaderToggled(false));
            if (!res) return;
            setData(res);
        }
        getData();
    }, [compCode, dispatch])

    return (
        <section className="payment-history">
            <div className="row h-100">
                <div className="col-12">
                    <h2 className="heading-primary"><i className="bx bxs-notepad icon-badge" style={{'--icon-bg': '#43f1ff', '--icon-border': '#00a1ed', fontSize: '0.9em', padding: '0.25em', color: '#5548ff'}}></i> Fees Payment Details</h2>
                    <div className="table-wrapper overflow-auto">

                        <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col">Sl No. &nbsp;</th>
                                    <th scope="col">Receipt No.</th>
                                    <th scope="col">Receipt Date</th>
                                    <th scope="col">Payment Through</th>
                                    <th scope="col">Transaction No</th>
                                    <th scope="col" className="text-end">Amount</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.PGPaymentList.map((i, n) => (
                                    <tr key={i.ReceiptNo}>
                                        <td>{n + 1}</td>
                                        <td>{i.ReceiptNo}</td>
                                        <td>{i.ReceiptDate.slice(0, 10).split('-').reverse().join('/')}</td>
                                        <td>{i.BankDesc}</td>
                                        <td>{i.BankInstrumentNo}</td>
                                        <td className="text-end">{parseFloat(i.Amount).toFixed(2)}</td>
                                        <td><i className='bx bx-file'></i> Print</td>
                                    </tr>
                                ))}
                                {/* <tr>
                                    <td>1</td>
                                    <td>Ayushman Sikder</td>
                                    <td>23ECE070/23ECE070</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>394,700.00</td>
                                    <td>12,000.00</td>
                                    <td><i className='bx bx-file'></i> Print</td>
                                </tr> */}
                            </tbody>
                        </table>





                        {/* <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col"># &nbsp;</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Enrollment/Roll No</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Course Fees</th>
                                    <th scope="col">Caution</th>
                                    <th scope="col">Add/Less</th>
                                    <th scope="col">Granted</th>
                                    <th scope="col">Received</th>
                                    <th scope="col">Current Due</th>
                                    <th scope="col">Total Course Due</th>
                                    <th scope="col">Refund</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ayushman Sikder</td>
                                    <td>23ECE070/23ECE070</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>394,700.00</td>
                                    <td>12,000.00</td>
                                    <td>0.00</td>
                                    <td>406,700.00</td>
                                    <td>114,700.00</td>
                                    <td>0.00</td>
                                    <td>292,000.00</td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td colSpan={12} style={{padding: '1em 0.7em'}}>
                                        <div className="table-wrapper">
                                            <table className="table basic_table list-table mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Semester</th>
                                                        <th scope="col">Fee</th>
                                                        <th scope="col">Due Date</th>
                                                        <th scope="col">Voucher No.</th>
                                                        <th scope="col">Challan No.</th>
                                                        <th scope="col">Instrmt. No.</th>
                                                        <th scope="col">Challan Date</th>
                                                        <th scope="col">Payment Mode</th>
                                                        <th scope="col">Amount (Rs)</th>
                                                        <th scope="col">Print</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>SEMESTER FEES</td>
                                                        <td>15/06/2023</td>
                                                        <td>FIEM/05/23-24/0913</td>
                                                        <td></td>
                                                        <td>315049992392/</td>
                                                        <td>30/05/2023</td>
                                                        <td>NET BANKING</td>
                                                        <td>40,000.00</td>
                                                        <td><i className='bx bx-file'></i> Print</td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>SEMESTER FEES</td>
                                                        <td>15/06/2023</td>
                                                        <td>FIEM/05/23-24/0913</td>
                                                        <td></td>
                                                        <td>315049992392/</td>
                                                        <td>30/05/2023</td>
                                                        <td>NET BANKING</td>
                                                        <td>40,000.00</td>
                                                        <td><i className='bx bx-file'></i> Print</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentHistory;