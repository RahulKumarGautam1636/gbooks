const Home = () => {
    return (
        <section className="home">
            <div className="content-box h-100">
                <div className="pane-block pane-left">
                    <h2 className="heading-primary">Payment Information</h2>
                    <div className="card-wrapper">
                        <div className="home-card history">
                            <h1><i className='bx bxs-hourglass icon-badge' style={{'--icon-bg': '#1c0e8f', '--icon-border': '#03A9F4'}}></i> Payment History</h1>
                        </div>
                        <div className="home-card fees">
                            <h1><i className="bx bx-rupee icon-badge" style={{'--icon-bg': '#02c36a', '--icon-border': '#6bffba'}}></i> Fees Payment</h1>
                        </div>
                    </div>
                </div>
                <div className="pane-block pane-right">
                    <div>
                        <table className="table basic_table">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={4}>General Information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Name :</th>
                                    <td>Ayusman Sikder</td>
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

export default Home;