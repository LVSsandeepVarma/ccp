import Header from "../Components/Header";

export default function Dashboard(){
    return(
        <>
        <div id="layout-wrapper">
            <Header/>
            <div className="main-content">
            <div className="page-content">
               <div className="container-fluid">
                  <div className="row project-wrapper">
                     <div className="col-xxl-8">
                        <div className="row">
                           <div className="col-xl-4">
                              <div className="card card-animate">
                                 <div className="card-body">
                                    <div className="d-flex align-items-center">
                                       <div className="avatar-sm flex-shrink-0">
                                          <span className="avatar-title bg-soft-secondary rounded-2 fs-2">
                                          <i className="bx bx-time-five text-secondary"></i>
                                          </span>
                                       </div>
                                       <div className="flex-grow-1 ms-3">
                                          <p className="text-uppercase fw-medium text-muted mb-3">Last Week Call Duration</p>
                                          <div className="d-flex align-items-center mb-3">
                                             <h4 className="flex-grow-1 mb-0"><span className="counter-value" data-target="18">0</span>h <span className="counter-value" data-target="13">0</span>m <span className="counter-value" data-target="43">0</span>s</h4>
                                             <span className="badge badge-soft-success fs-12"><i className="ri-arrow-up-s-line fs-13 align-middle me-1"></i>3.58 %</span>
                                          </div>
                                          <p className="text-muted mb-0">Leads this month</p>
                                       </div>
                                    </div>
                                 </div>
                                 {/* <!--  end card body --> */}
                              </div>
                           </div>
                           {/* <!--  end col --> */}
                           <div className="col-xl-4">
                              <div className="card card-animate">
                                 <div className="card-body">
                                    <div className="d-flex align-items-center">
                                       <div className="avatar-sm flex-shrink-0">
                                          <span className="avatar-title bg-soft-primary text-primary rounded-2 fs-2">
                                          <i className="bx bx-time-five text-primary"></i>
                                          </span>
                                       </div>
                                       <div className="flex-grow-1 overflow-hidden ms-3">
                                          <p className="text-uppercase fw-medium text-muted text-truncate mb-3">Yesterday Call Duration</p>
                                          <div className="d-flex align-items-center mb-3">
                                             <h4 className="flex-grow-1 mb-0"><span className="counter-value" data-target="5">0</span>h <span className="counter-value" data-target="53">0</span>m <span className="counter-value" data-target="23">0</span>s</h4>
                                             <span className="badge badge-soft-danger fs-12"><i className="ri-arrow-down-s-line fs-13 align-middle me-1"></i>10.35 %</span>
                                          </div>
                                          <p className="text-muted text-truncate mb-0">Work this month</p>
                                       </div>
                                    </div>
                                 </div>
                                 {/* <!--  end card body --> */}
                              </div>
                           </div>
                           {/* <!--  end col --> */}
                           <div className="col-xl-4">
                              <div className="card card-animate">
                                 <div className="card-body">
                                    <div className="d-flex align-items-center">
                                       <div className="avatar-sm flex-shrink-0">
                                          <span className="avatar-title bg-soft-success text-success rounded-2 fs-2">
                                          <i className="bx bx-time-five text-success"></i>
                                          </span>
                                       </div>
                                       <div className="flex-grow-1 overflow-hidden ms-3">
                                          <p className="text-uppercase fw-medium text-muted text-truncate mb-3">Today Call Duration</p>
                                          <div className="d-flex align-items-center mb-3">
                                             <h4 className="flex-grow-1 mb-0"><span className="counter-value" data-target="5">0</span>h <span className="counter-value" data-target="53">0</span>m <span className="counter-value" data-target="23">0</span>s</h4>
                                             <span className="badge badge-soft-danger fs-12"><i className="ri-arrow-down-s-line fs-13 align-middle me-1"></i>10.35 %</span>
                                          </div>
                                          <p className="text-muted text-truncate mb-0">Work this month</p>
                                       </div>
                                    </div>
                                 </div>
                                 {/* <!--  end card body --> */}
                              </div>
                           </div>
                           {/* <!--  end col --> */}
                        </div>
                        {/* <!--  end row --> */}
                        <div className="row">
                           <div className="col-xl-12">
                              <div className="card">
                                 <div className="card-header border-0 align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Enquiries Overview</h4>
                                    <div>
                                       <button type="button" className="btn btn-soft-primary btn-sm">
                                       Today
                                       </button>
                                       <button type="button" className="btn btn-soft-secondary btn-sm">
                                       Yesterday
                                       </button>
                                       <button type="button" className="btn btn-soft-secondary btn-sm">
                                       Week
                                       </button>
                                    </div>
                                 </div>
                                 {/* <!--  end card header --> */}
                                 <div className="card-header p-0 border-0 bg-soft-light">
                                    <div className="row g-0 text-center">
                                       <div className="col-6 col-sm-3">
                                          <div className="p-3 border border-dashed border-start-0">
                                             <h5 className="mb-1"><span className="counter-value" data-target="51">0</span></h5>
                                             <p className="text-muted mb-0"><i className="mdi mdi-phone"></i> New Enquiries</p>
                                          </div>
                                       </div>
                                       {/* <!-- end col--> */}
                                       <div className="col-6 col-sm-3">
                                          <div className="p-3 border border-dashed border-start-0">
                                             <h5 className="mb-1 text-info"><span className="counter-value" data-target="352">0</span></h5>
                                             <p className="text-muted mb-0"><i className="mdi mdi-phone-ring"></i> Ringing Enquiries</p>
                                          </div>
                                       </div>
                                       {/* <!-- end col--> */}
                                       <div className="col-6 col-sm-3">
                                          <div className="p-3 border border-dashed border-start-0">
                                             <h5 className="mb-1 text-warning"><span className="counter-value" data-target="228">0</span></h5>
                                             <p className="text-muted mb-0"><i className="mdi mdi-phone-plus-outline"></i> Postponed Enquiries</p>
                                          </div>
                                       </div>
                                       {/* <!-- end col--> */}
                                       <div className="col-6 col-sm-3">
                                          <div className="p-3 border border-dashed border-start-0 border-end-0">
                                             <h5 className="mb-1 text-danger"><span className="counter-value" data-target="189">0</span></h5>
                                             <p className="text-muted mb-0"><i className="mdi mdi-phone-off"></i> Not Interested Enquiries</p>
                                          </div>
                                       </div>
                                       {/* <!-- end col--> */}
                                    </div>
                                 </div>
                                 {/* <!--  end card header --> */}
                                 <div className="card-body p-0 pb-2">
                                    <div>
                                       <div id="projects-overview-chart" data-colors='["--vz-primary", "--vz-secondary", "--vz-danger"]' dir="ltr" className="apex-charts"></div>
                                    </div>
                                 </div>
                                 {/* <!--  end card body --> */}
                              </div>
                              {/* <!--  end card --> */}
                           </div>
                           {/* <!--  end col --> */}
                        </div>
                        {/* <!--  end row --> */}
                     </div>
                     {/* <!--  end col --> */}
                     <div className="col-xxl-4">
                        <div className="card">
                           <div className="card-header border-0">
                              <h4 className="card-title mb-0">Upcoming Reminders</h4>
                           </div>
                           {/* <!--  end cardheader --> */}
                           <div className="card-body pt-0">
                              <div className="upcoming-scheduled">
                                 <input type="text" className="form-control" data-provider="flatpickr" data-date-format="d M, Y" data-deafult-date="today" data-inline-date="true"/>
                              </div>
                              <h6 className="text-uppercase fw-semibold mt-4 mb-3 text-muted">Events:</h6>
                              <div className="mini-stats-wid d-flex align-items-center mt-3">
                                 <div className="flex-shrink-0 avatar-sm">
                                    <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                                    09
                                    </span>
                                 </div>
                                 <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Development planning</h6>
                                    <p className="text-muted mb-0">iTest Factory </p>
                                 </div>
                                 <div className="flex-shrink-0">
                                    <p className="text-muted mb-0">9:20 <span className="text-uppercase">am</span></p>
                                 </div>
                              </div>
                              {/* <!--  end --> */}
                              <div className="mini-stats-wid d-flex align-items-center mt-3">
                                 <div className="flex-shrink-0 avatar-sm">
                                    <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                                    12
                                    </span>
                                 </div>
                                 <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Design new UI and check sales</h6>
                                    <p className="text-muted mb-0">Meta4Systems</p>
                                 </div>
                                 <div className="flex-shrink-0">
                                    <p className="text-muted mb-0">11:30 <span className="text-uppercase">am</span></p>
                                 </div>
                              </div>
                              {/* <!--  end --> */}
                              <div className="mini-stats-wid d-flex align-items-center mt-3">
                                 <div className="flex-shrink-0 avatar-sm">
                                    <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                                    25
                                    </span>
                                 </div>
                                 <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">Weekly catch-up </h6>
                                    <p className="text-muted mb-0">Nesta Technologies</p>
                                 </div>
                                 <div className="flex-shrink-0">
                                    <p className="text-muted mb-0">02:00 <span className="text-uppercase">pm</span></p>
                                 </div>
                              </div>
                              {/* <!--  end --> */}
                              <div className="mini-stats-wid d-flex align-items-center mt-3">
                                 <div className="flex-shrink-0 avatar-sm">
                                    <span className="mini-stat-icon avatar-title rounded-circle text-success bg-soft-success fs-4">
                                    27
                                    </span>
                                 </div>
                                 <div className="flex-grow-1 ms-3">
                                    <h6 className="mb-1">James Bangs (Client) Meeting</h6>
                                    <p className="text-muted mb-0">Nesta Technologies</p>
                                 </div>
                                 <div className="flex-shrink-0">
                                    <p className="text-muted mb-0">03:45 <span className="text-uppercase">pm</span></p>
                                 </div>
                              </div>
                              {/* <!--  end --> */}
                              <div className="mt-3 text-center">
                                 <a href="javascript:void(0);" className="text-muted text-decoration-underline">View all Events</a>
                              </div>
                           </div>
                           {/* <!--  end cardbody --> */}
                        </div>
                        {/* <!--  end card --> */}
                     </div>
                     {/* <!--  end col --> */}
                  </div>
                  {/* <!--  end row --> */}
                  <div className="row">
                     <div className="col-xl-12">
                        <div className="card card-height-100">
                           <div className="card-header d-flex align-items-center">
                              <h4 className="card-title flex-grow-1 mb-0">Today&apos;s Calls</h4>
                              <div className="flex-shrink-0">
                                 <a href="javascript:void(0);" className="btn btn-soft-info btn-sm">Export Report</a>
                              </div>
                           </div>
                           {/* <!--  end cardheader --> */}
                           <div className="card-body">
                              <div className="table-responsive table-card">
                                 <table className="table table-nowrap table-centered align-middle">
                                    <thead className="bg-light text-muted">
                                       <tr>
                                          <th scope="col">Sl No.</th>
                                          <th scope="col">Call Date</th>
                                          <th scope="col">Linked ID</th>
                                          <th scope="col">Caller ID</th>
                                          <th scope="col">Destination</th>
                                          <th scope="col">Disposition</th>
                                          <th scope="col">Duration</th>
                                          <th scope="col" style={{width: "10%"}}>Recording</th>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                    </thead>
                                    {/* <!--  thead --> */}
                                    <tbody>
                                       <tr>
                                          <td>1</td>
                                          <td className="fw-medium">2023-08-23 09:13:52</td>
                                          <td>
                                             1692762232.2904217
                                          </td>
                                          <td>68415979</td>
                                          <td>09786855179</td>
                                          <td><span className="badge badge-soft-success">ANSWERED</span></td>
                                          <td className="text-muted">5:15</td>
                                          <td>
                                             <audio controls>
                                                <source src="horse.ogg" type="audio/ogg"/>
                                                <source src="horse.mp3" type="audio/mpeg"/>
                                                Your browser does not support the audio tag.
                                             </audio>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                    </tbody>
                                    {/* <!--  end tbody --> */}
                                 </table>
                                 {/* <!--  end table --> */}
                              
                              
                              </div>
                              <div className="align-items-center mt-xl-3 mt-4 justify-content-between d-flex">
                                 <div className="flex-shrink-0">
                                    <div className="text-muted">Showing <span className="fw-semibold">5</span> of <span className="fw-semibold">25</span> Results </div>
                                 </div>
                                 <ul className="pagination pagination-separated pagination-sm mb-0">
                                    <li className="page-item disabled">
                                       <a href="#" className="page-link">←</a>
                                    </li>
                                    <li className="page-item">
                                       <a href="#" className="page-link">1</a>
                                    </li>
                                    <li className="page-item active">
                                       <a href="#" className="page-link">2</a>
                                    </li>
                                    <li className="page-item">
                                       <a href="#" className="page-link">3</a>
                                    </li>
                                    <li className="page-item">
                                       <a href="#" className="page-link">→</a>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           {/* <!--  end card body --> */}
                        </div>
                        {/* <!--  end card --> */}
                     </div>
                     {/* <!--  end col --> */}
                  </div>
                  {/* <!--  end row --> */}
                  <div className="row">
                     <div className="col-xxl-4">
                        <div className="card card-height-100">
                           <div className="card-header align-items-center d-flex">
                              <h4 className="card-title mb-0 flex-grow-1">Tasks</h4>
                              <div className="flex-shrink-0">
                                 <div className="dropdown card-header-dropdown">
                                    <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="fw-semibold text-uppercase fs-12">Sort by: </span><span className="text-muted">Last 30 Days<i className="mdi mdi-chevron-down ms-1"></i></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                       <a className="dropdown-item" href="#">Today</a>
                                       <a className="dropdown-item" href="#">Yesterday</a>
                                       <a className="dropdown-item" href="#">Last 7 Days</a>
                                       <a className="dropdown-item" href="#">Last 30 Days</a>
                                       <a className="dropdown-item" href="#">This Month</a>
                                       <a className="dropdown-item" href="#">Last Month</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* <!--  end card header --> */}
                           <div className="card-body">
                              <div className="table-responsive table-card">
                                 <table className="table table-borderless table-nowrap align-middle mb-0">
                                    <thead className="table-light text-muted">
                                       <tr>
                                          <th scope="col">Enquiries</th>
                                          <th scope="col">Date</th>
                                          <th scope="col">Status</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-1.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Donald Risher</h5>
                                                <p className="fs-12 mb-0 text-muted">Product Manager</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td style={{width: "5%"}}>
                                             <div id="radialBar_chart_1" data-colors='["--vz-primary"]' data-chart-series="50" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Jansh Brown</h5>
                                                <p className="fs-12 mb-0 text-muted">Lead Developer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_2" data-colors='["--vz-primary"]' data-chart-series="45" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Carroll Adams</h5>
                                                <p className="fs-12 mb-0 text-muted">Lead Designer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_3" data-colors='["--vz-primary"]' data-chart-series="75" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-4.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">William Pinto</h5>
                                                <p className="fs-12 mb-0 text-muted">UI/UX Designer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_4" data-colors='["--vz-warning"]' data-chart-series="25" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Garry Fournier</h5>
                                                <p className="fs-12 mb-0 text-muted">Web Designer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_5" data-colors='["--vz-primary"]' data-chart-series="60" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-5.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Susan Denton</h5>
                                                <p className="fs-12 mb-0 text-muted">Lead Designer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_6" data-colors='["--vz-success"]' data-chart-series="85" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                       <tr>
                                          <td className="d-flex">
                                             <img src="assets/images/users/avatar-3.jpg" alt="" className="avatar-xs rounded-3 me-2"/>
                                             <div>
                                                <h5 className="fs-13 mb-0">Joseph Jackson</h5>
                                                <p className="fs-12 mb-0 text-muted">React Developer</p>
                                             </div>
                                          </td>
                                          <td>
                                             <h6 className="mb-0">23 August, 2023</h6>
                                          </td>
                                          <td>
                                             <div id="radialBar_chart_7" data-colors='["--vz-primary"]' data-chart-series="70" className="apex-charts" dir="ltr"></div>
                                          </td>
                                       </tr>
                                       {/* <!--  end tr --> */}
                                    </tbody>
                                    {/* <!--  end tbody --> */}
                                 </table>
                                 {/* <!--  end table --> */}
                              </div>
                           </div>
                           {/* <!--  end cardbody --> */}
                        </div>
                        {/* <!--  end card --> */}
                     </div>
                     {/* <!--  end col --> */}
                     <div className="col-xxl-4 col-lg-6">
                        <div className="card card-height-100">
                           <div className="card-header align-items-center d-flex">
                              <h4 className="card-title mb-0 flex-grow-1">Comments</h4>
                           </div>
                           {/* <!--  end card header --> */}
                           <div className="card-body p-0">
                              <div id="users-chat">
                                 <div className="chat-conversation p-3 h-[400px]" id="chat-conversation" data-simplebar >
                                    <ul className="list-unstyled chat-conversation-list chat-sm" id="users-conversation">
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                       <li className="chat-list left">
                                          <div className="conversation-list align-items-start">
                                             <div className="chat-avatar">
                                                <img src="assets/images/users/avatar-2.jpg" alt=""/>
                                             </div>
                                             <div className="user-chat-content">
                                                <p className="mb-0">Good morning, How are you? What about our next meeting?</p>
                                                <div className="conversation-name"><small className="text-muted time">09:07 am</small> <span className="text-success check-message-icon"><i className="ri-check-double-line align-bottom"></i></span></div>
                                             </div>
                                          </div>
                                       </li>
                                       {/* <!--  chat-list --> */}
                                    </ul>
                                 </div>
                              </div>
                              <div className="border-top border-top-dashed">
                              </div>
                           </div>
                           {/* <!--  end cardbody --> */}
                        </div>
                        {/* <!--  end card --> */}
                     </div>
                     {/* <!--  end col --> */}
                     <div className="col-xxl-4 col-lg-6">
                        <div className="card card-height-100">
                           <div className="card-header align-items-center d-flex">
                              <h4 className="card-title mb-0 flex-grow-1">Invoice Status</h4>
                              <div className="flex-shrink-0">
                                 <div className="dropdown card-header-dropdown">
                                    <a className="dropdown-btn text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    All Time <i className="mdi mdi-chevron-down ms-1"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                       <a className="dropdown-item" href="#">All Time</a>
                                       <a className="dropdown-item" href="#">Last 7 Days</a>
                                       <a className="dropdown-item" href="#">Last 30 Days</a>
                                       <a className="dropdown-item" href="#">Last 90 Days</a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {/* <!--  end card header --> */}
                           <div className="card-body">
                              <div id="prjects-status" data-colors='["--vz-success", "--vz-primary", "--vz-warning", "--vz-secondary"]' className="apex-charts" dir="ltr"></div>
                              <div className="mt-3">
                                 <div className="d-flex justify-content-center align-items-center mb-4">
                                    <h2 className="me-3 ff-secondary mb-0">258</h2>
                                    <div>
                                       <p className="text-muted mb-0">Total Invoices</p>
                                       <p className="text-success fw-medium mb-0">
                                          <span className="badge badge-soft-success p-1 rounded-circle"><i className="ri-arrow-right-up-line"></i></span> +3 New
                                       </p>
                                    </div>
                                 </div>
                                 <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                    <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-success align-middle me-2"></i> Completed</p>
                                    <div>
                                       <span className="text-muted pe-5">125 Invoices</span>
                                       <span className="text-success fw-medium fs-12">15870hrs</span>
                                    </div>
                                 </div>
                                 {/* <!--  end --> */}
                                 <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                    <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-primary align-middle me-2"></i> Paid</p>
                                    <div>
                                       <span className="text-muted pe-5">42 Invoices</span>
                                       <span className="text-success fw-medium fs-12">243hrs</span>
                                    </div>
                                 </div>
                                 {/* <!--  end --> */}
                                 <div className="d-flex justify-content-between border-bottom border-bottom-dashed py-2">
                                    <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-warning align-middle me-2"></i> Partially Paid</p>
                                    <div>
                                       <span className="text-muted pe-5">58 Invoices</span>
                                       <span className="text-success fw-medium fs-12">~2050hrs</span>
                                    </div>
                                 </div>
                                 {/* <!--  end --> */}
                                 <div className="d-flex justify-content-between py-2">
                                    <p className="fw-medium mb-0"><i className="ri-checkbox-blank-circle-fill text-secondary align-middle me-2"></i> Unpaid</p>
                                    <div>
                                       <span className="text-muted pe-5">89 Invoices</span>
                                       <span className="text-success fw-medium fs-12">~900hrs</span>
                                    </div>
                                 </div>
                                 {/* <!--  end --> */}
                              </div>
                           </div>
                           {/* <!--  end cardbody --> */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <footer className="footer w-100">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-sm-6">
                        <script>document.write(new Date().getFullYear())</script> © All Rights Reserved.
                     </div>
                     <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                           Designed and Developed by Call Center Projects
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
         </div>
        </div>
        </>
    )
}