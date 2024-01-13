/* eslint-disable react/prop-types */
import Header from "./Header";
import CustomersTable from "./CustomersTable";

export default function Customers() {
  return (
    <>
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card crm-widget">
                    <div className="card-body p-0">
                      <div className="row row-cols-xxl-5 row-cols-md-3 row-cols-1 g-0">
                        <div className="col">
                          <div className="py-4 px-3">
                            <h5 className="text-muted text-uppercase fs-13 mb-3 font-semibold">
                              Total Customers{" "}
                              <i className="font-bold ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i>
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <i className="las la-rocket fs-3 text-muted"></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h4 className="mb-0">
                                  <span
                                    className="counter-value !font-bold text-xl"
                                    data-target="197"
                                  >
                                    197
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                        <div className="col">
                          <div className="mt-3 mt-md-0 py-4 px-3">
                            <h5 className="text-muted text-uppercase fs-13 mb-3 font-semibold">
                              Active Customers{" "}
                              <i className="font-bold ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i>
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <i className="ri-exchange-dollar-line fs-3 text-muted"></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h4 className="mb-0 !font-bold text-xl">
                                  $
                                  <span
                                    className="counter-value !font-bold text-xl"
                                    data-target="489.4"
                                  >
                                    489.4
                                  </span>
                                  k
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                        <div className="col">
                          <div className="mt-3 mt-md-0 py-4 px-3">
                            <h5 className="text-muted text-uppercase fs-13 mb-3 font-semibold">
                              Inactive Customers{" "}
                              <i className="font-bold ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"></i>
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <i className="ri-pulse-line fs-3 text-muted"></i>
                              </div>
                              <div className="flex-grow-1 ms-3 ">
                                <h4 className="mb-0 !font-bold text-xl">
                                  <span
                                    className="counter-value "
                                    data-target="32.89"
                                  >
                                    32.89
                                  </span>
                                  %
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                        <div className="col">
                          <div className="mt-3 mt-lg-0 py-4 px-3">
                            <h5 className="text-muted text-uppercase fs-13 mb-3 font-semibold">
                              Active Contacts{" "}
                              <i className="font-bold ri-arrow-up-circle-line text-success fs-18 float-end align-middle"></i>
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <i className="las la-trophy fs-3 text-muted"></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h4 className="mb-0 font-bold text-xl">
                                  $
                                  <span
                                    className="counter-value !font-bold text-xl"
                                    data-target="1596.5"
                                  >
                                    1,596.5
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                        <div className="col">
                          <div className="mt-3 mt-lg-0 py-4 px-3">
                            <h5 className="text-muted text-uppercase fs-13 mb-3 font-semibold">
                              Inactive Contacts{" "}
                              <i className="font-bold ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"></i>
                            </h5>
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0">
                                <i className="las la-handshake fs-3 text-muted"></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h4 className="mb-0">
                                  <span
                                    className="counter-value !font-bold text-xl"
                                    data-target="2659"
                                  >
                                    2,659
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                      </div>
                      {/* <!-- end row --> */}
                    </div>
                    {/* <!-- end card body --> */}
                  </div>
                  {/* <!-- end card --> */}
                </div>
                {/* <!-- end col --> */}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-1 font-semibold">Customers</h4>
                    </div>
                    <div className="card-body !border-none">
                                          <CustomersTable/>
                    </div>
                    {/* <!-- end card-body --> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
              </div>
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer w-100">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} ©
                  All Rights Reserved.
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
  );
}
