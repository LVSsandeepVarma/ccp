import Header from "./Header";
import EnqCusCharts from "./charts/EnqCus";
import EnquiriesPie from "./charts/EnquiriesPie";
import PaymentRadialPie from "./charts/PaymentRadialPie";

export default function Profile() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="profile-foreground position-relative mx-n4 mt-n4">
              <div className="profile-wid-bg">
                <img
                  src="assets/images/profile-bg.jpg"
                  alt=""
                  className="profile-wid-img"
                />
              </div>
            </div>
            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
              <div className="row g-4">
                <div className="col-auto">
                  <div className="avatar-lg">
                    <img
                      src="assets/images/users/avatar-1.jpg"
                      alt="user-img"
                      className="img-thumbnail rounded-circle"
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="p-2 text-start">
                    <h3 className="text-white mb-1 h3 text-start">
                      Anna Adame
                    </h3>
                    <p className="text-white-75">Designation</p>
                    <div className="hstack text-white-50 gap-1">
                      <div className="my-4">
                        <i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>
                        Office Name, Branch City
                      </div>
                      {/* <!-- <div>
                                    <i class="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>Themesbrand
                                    </div> --> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <div className="d-flex profile-wrapper">
                    <ul
                      className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link fs-14 active"
                          data-bs-toggle="tab"
                          href="#personal-tab"
                          role="tab"
                        >
                          <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Personal
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link fs-14"
                          data-bs-toggle="tab"
                          href="#performance"
                          role="tab"
                        >
                          <i className="ri-list-unordered d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Performance
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link fs-14"
                          data-bs-toggle="tab"
                          href="#activity"
                          role="tab"
                        >
                          <i className="ri-price-tag-line d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Activity
                          </span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link fs-14"
                          data-bs-toggle="tab"
                          href="#password"
                          role="tab"
                        >
                          <i className="ri-folder-4-line d-inline-block d-md-none"></i>{" "}
                          <span className="d-none d-md-inline-block">
                            Password
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content pt-4 text-muted">
                    <div
                      className="tab-pane active"
                      id="personal-tab"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-xxl-3">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title mb-3 h5">Info</h5>
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <tbody>
                                    <tr>
                                      <th className="ps-0" scope="row">
                                        Full Name :
                                      </th>
                                      <td className="text-muted text-start">
                                        Anna Adame
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="ps-0" scope="row">
                                        Mobile :
                                      </th>
                                      <td className="text-muted text-start">
                                        +(1) 987 6543
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="ps-0" scope="row">
                                        E-mail :
                                      </th>
                                      <td className="text-muted text-start">
                                        daveadame@velzon.com
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="ps-0" scope="row">
                                        Location :
                                      </th>
                                      <td className="text-muted text-start">
                                        California, United States
                                      </td>
                                    </tr>
                                    <tr>
                                      <th className="ps-0" scope="row">
                                        Joining Date
                                      </th>
                                      <td className="text-muted text-start">
                                        24 Nov 2021
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xxl-9">
                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title h5 mb-0">Details</h5>
                              <div className="row">
                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="mdi mdi-phone"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">Call Extension :</p>
                                      <h6 className="text-truncate mb-0 h6">
                                        8002
                                      </h6>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="ri-user-2-fill"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">Team Leader :</p>
                                      <h6 className="text-truncate mb-0 h6">
                                        TL Name
                                      </h6>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="mdi mdi-calendar"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">Active Since :</p>
                                      <a className="fw-semibold text-primary">
                                        24 August, 2023
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr />
                              <h5 className="card-title mt-3 mb-0 h5">
                                Leave Details
                              </h5>
                              <div className="row">
                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="mdi mdi-file-document-edit"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">
                                        Last Leave Request :
                                      </p>
                                      <h6 className="text-truncate h6 mb-0">
                                        24 August, 2023
                                      </h6>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="mdi mdi-file-document-edit"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">
                                        Total Leaves <small>(This Month)</small>{" "}
                                        :
                                      </p>
                                      <h6 className="text-truncate h6 mb-0">2</h6>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-6 col-md-4">
                                  <div className="d-flex mt-4">
                                    <div className="flex-shrink-0 avatar-xs align-self-center me-3">
                                      <div className="avatar-title bg-light rounded-circle fs-16 text-primary">
                                        <i className="mdi mdi-file-document-edit"></i>
                                      </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                      <p className="mb-1">
                                        Unapproved Leaves{" "}
                                        <small>(This Month)</small> :
                                      </p>
                                      <h6 className="text-truncate mb-0 h6 text-danger">
                                        2
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-body">
                              <h5 className="card-title mb-3 h5">Bank Details</h5>
                              <div className="row">
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      Bank Name
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Enter Bank Name"
                                      />
                                      <i className="mdi mdi-bank"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      Bank Branch
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Enter Bank Branch"
                                      />
                                      <i className="mdi mdi-city-variant-outline"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      Account Number
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id=""
                                        placeholder="Enter Account Number"
                                      />
                                      <i className="mdi mdi-card-bulleted-outline"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-lg-4 mt-3">
                                  <div>
                                    <label
                                      htmlFor="iconInput"
                                      className="form-label"
                                    >
                                      IFSC Code
                                    </label>
                                    <div className="form-icon">
                                      <input
                                        type="text"
                                        className="form-control form-control-icon"
                                        id="iconInput"
                                        placeholder="Enter IFSC Code"
                                      />
                                      <i className="mdi mdi-card-bulleted-outline"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-3">
                                  <button
                                    type="button"
                                    className="btn btn-primary bg-primary waves-effect waves-light"
                                  >
                                    <i className="mdi mdi-content-save"></i>{" "}
                                    Save
                                  </button>
                                  <button className="btn btn-outline-primary btn-load">
                                    <span className="d-flex align-items-center">
                                      <span className="flex-grow-1 me-2">
                                        Please Wait...
                                      </span>
                                      <span
                                        className="spinner-border flex-shrink-0"
                                        role="status"
                                      >
                                        <span className="visually-hidden">
                                          Please Wait...
                                        </span>
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="performance"
                      role="tabpanel"
                    >
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="card">
                            <div className="card-header">
                              <h4 className="card-title mb-0 h4">
                                Enquiries Overview
                              </h4>
                            </div>

                            <div className="card-body py-5">
                              <EnquiriesPie series={[25,30,50,75,45]}/>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="card">
                            <div className="card-header">
                              <h4 className="card-title mb-0 h4">
                                Invoices/Sales Overview
                              </h4>
                            </div>

                            <div className="card-body">
                              <PaymentRadialPie series={[755466,66574,75461]}/>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="card">
                            <div className="card-header">
                              <h4 className="card-title mb-0 h4">Line Chart</h4>
                            </div>
                            <div className="card-body">
                              <EnqCusCharts ENQ={[45, 30, 25, 15, 30, 25, 20, 18, 45, 30, 40, 50]} CUS={[50,30,25,15,30,28,40,23,54,20,36,24]} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="activity"
                      role="tabpanel"
                    >
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-warning">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Chat App Update
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          2 year Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-warning fs-10">
                                        Inprogress
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-1.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-3.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-light text-primary">
                                                J
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-success">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          ABC Project Customization
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          2 month Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-primary fs-10">
                                        {" "}
                                        Progress
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-8.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-6.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-primary">
                                                2+
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-info">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Client - Frank Hook
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          1 hr Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-info fs-10">
                                        New
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            {" "}
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-4.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-light text-primary">
                                                M
                                              </div>
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-3.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-primary">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Velzon Project
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          11 hr Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-success fs-10">
                                        Completed
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-5.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-danger">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Brand Logo Design
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          10 min Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-info fs-10">
                                        New
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-6.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-light text-primary">
                                                E
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-primary">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Chat App
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          8 hr Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-warning fs-10">
                                        Inprogress
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-light text-primary">
                                                R
                                              </div>
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-3.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-8.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-warning">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Project Update
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          48 min Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-warning fs-10">
                                        Inprogress
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-6.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-5.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-4.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none profile-project-success">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Client - Jennifer
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          30 min Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-primary fs-10">
                                        Process
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            {" "}
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-1.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none mb-xxl-0 profile-project-info">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Bsuiness Template - UI/UX design
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          7 month Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-success fs-10">
                                        Completed
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-2.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-3.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-4.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-primary">
                                                2+
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none mb-xxl-0  profile-project-success">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Update Project
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          1 month Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-info fs-10">
                                        New
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-light text-primary">
                                                A
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none mb-sm-0  profile-project-danger">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          Bank Management System
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          10 month Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-success fs-10">
                                        Completed
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-6.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-5.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <div className="avatar-title rounded-circle bg-primary">
                                                2+
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-xxl-3 col-sm-6">
                              <div className="card profile-project-card shadow-none mb-0  profile-project-primary">
                                <div className="card-body p-4">
                                  <div className="d-flex">
                                    <div className="flex-grow-1 text-muted overflow-hidden">
                                      <h5 className="fs-14 text-truncate h5">
                                        <a
                                          href="#"
                                          className="text-dark font-bold"
                                        >
                                          PSD to HTML Convert
                                        </a>
                                      </h5>
                                      <p className="text-muted text-truncate mb-0">
                                        Last Update :{" "}
                                        <span className="fw-semibold text-dark">
                                          29 min Ago
                                        </span>
                                      </p>
                                    </div>
                                    <div className="flex-shrink-0 ms-2">
                                      <div className="badge badge-soft-info fs-10">
                                        New
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex mt-4">
                                    <div className="flex-grow-1">
                                      <div className="d-flex align-items-center gap-2">
                                        <div>
                                          <h5 className="fs-12 text-muted mb-0 h5">
                                            Members :
                                          </h5>
                                        </div>
                                        <div className="avatar-group">
                                          <div className="avatar-group-item">
                                            <div className="avatar-xs">
                                              <img
                                                src="assets/images/users/avatar-7.jpg"
                                                alt=""
                                                className="rounded-circle img-fluid"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="mt-4">
                                <ul className="pagination pagination-separated justify-content-center mb-0">
                                  <li className="page-item disabled">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      <i className="mdi mdi-chevron-left"></i>
                                    </a>
                                  </li>
                                  <li className="page-item active">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      1
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      2
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      3
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      4
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      5
                                    </a>
                                  </li>
                                  <li className="page-item">
                                    <a
                                      href="javascript:void(0);"
                                      className="page-link"
                                    >
                                      <i className="mdi mdi-chevron-right"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="password"
                      role="tabpanel"
                    >
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title mb-3 text-center h5">
                            Change Password
                          </h5>
                          <hr />
                          <div className="col-xl-8 mx-auto">
                            <div className="row">
                              <div className="col-12 col-lg-4">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label"
                                  >
                                    Current Password
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      className="form-control form-control-icon"
                                      id=""
                                      placeholder="Enter Current Password"
                                    />
                                    <i className="ri-lock-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label"
                                  >
                                    New Password
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      className="form-control form-control-icon"
                                      id=""
                                      placeholder="Enter New Password"
                                    />
                                    <i className="ri-lock-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label"
                                  >
                                    Confirm Password
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      className="form-control form-control-icon"
                                      id=""
                                      placeholder="Re-enter Password"
                                    />
                                    <i className="ri-lock-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-4 mt-3">
                                <div>
                                  <label
                                    htmlFor="iconInput"
                                    className="form-label"
                                  >
                                    OTP
                                  </label>
                                  <div className="form-icon">
                                    <input
                                      type="text"
                                      className="form-control form-control-icon"
                                      id="iconInput"
                                      placeholder="Enter OTP"
                                    />
                                    <i className="ri-lock-line"></i>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mt-3">
                                <button
                                  type="button"
                                  className="btn btn-primary bg-primary waves-effect waves-light"
                                >
                                  <i className="mdi mdi-content-save"></i> Save
                                </button>
                                <button className="btn btn-outline-primary btn-load">
                                  <span className="d-flex align-items-center">
                                    <span className="flex-grow-1 me-2">
                                      Please Wait...
                                    </span>
                                    <span
                                      className="spinner-border flex-shrink-0"
                                      role="status"
                                    >
                                      <span className="visually-hidden">
                                        Please Wait...
                                      </span>
                                    </span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer w-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                {new Date().getFullYear()} © All
                Rights Reserved.
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
  );
}