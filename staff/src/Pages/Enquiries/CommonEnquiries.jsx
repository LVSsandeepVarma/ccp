/* eslint-disable react/prop-types */
import { useState } from "react";
import { useEnquiriesQuery } from "../../services/api";
import Header from "../Header";
import CommonTable from "./CommonTable";
import CreateCustomer from "./CreateCustomer";

export default function Enquiries({ type }) {
  const [enqSelected, setEnqSelected] = useState()
   console.log(type)

  const enquirySelected = (row) => {
    console.log(row, "enqSelected")
    setEnqSelected(row)
  }

  

      const {
        data: enquiriesData,
        isLoading,
        error: err,
      } = useEnquiriesQuery(
        type != "Not Interested" ? type?.toUpperCase() : "NOTINTERESTED"
      );
      console.log(
        enquiriesData,
        enquiriesData?.data?.enquiries?.per_page,
        isLoading,
        err
      );
    return (
      <>
        <div id="layout-wrapper">
          <Header />
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">
                {/* <!-- start page title --> */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 className="mb-sm-0 font-size-18 h4">
                        {type} Enquiries
                      </h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <a href="javascript: void(0);">Enquiries</a>
                          </li>
                          <li className="breadcrumb-item active">{type}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end page title --> */}
                <div className="row">
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">
                              Total Enquiries
                            </p>
                            <h4 className="mt-4 ff-secondary fw-semibold h4">
                              <span className="counter-value" data-target="234">
                                0
                              </span>
                            </h4>
                            <p className="mb-0 text-muted">
                              <span className="badge bg-light text-success mb-0">
                                {" "}
                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                17.32 %
                              </span>{" "}
                              vs. previous month
                            </p>
                          </div>
                          <div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                                <i className="mdi mdi-account-group"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                    {/* <!-- end card--> */}
                  </div>
                  {/* <!--end col--> */}
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">{type}</p>
                            <h4 className="mt-4 ff-secondary fw-semibold h4">
                              <span
                                className="counter-value"
                                data-target="64.5"
                              >
                                0
                              </span>
                            </h4>
                            <p className="mb-0 text-muted">
                              <span className="badge bg-light text-danger mb-0">
                                {" "}
                                <i className="ri-arrow-down-line align-middle"></i>{" "}
                                0.87 %
                              </span>{" "}
                              vs. previous month
                            </p>
                          </div>
                          <div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-success text-success rounded-circle fs-4">
                                <i className="mdi mdi-phone-ring"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                  </div>
                  {/* <!--end col--> */}
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">
                              Postponed
                            </p>
                            <h4 className="mt-4 ff-secondary fw-semibold h4">
                              <span className="counter-value" data-target="116">
                                0
                              </span>
                            </h4>
                            <p className="mb-0 text-muted">
                              <span className="badge bg-light text-danger mb-0">
                                {" "}
                                <i className="ri-arrow-down-line align-middle"></i>{" "}
                                2.52 %{" "}
                              </span>{" "}
                              vs. previous month
                            </p>
                          </div>
                          <div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-warning text-warning rounded-circle fs-4">
                                <i className="mdi mdi-directions"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                  </div>
                  {/* <!--end col--> */}
                  <div className="col-xxl-3 col-sm-6">
                    <div className="card card-animate">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-medium text-muted mb-0">
                              Not Interested Enquiries
                            </p>
                            <h4 className="mt-4 ff-secondary fw-semibold h4">
                              <span className="counter-value" data-target="184">
                                0
                              </span>
                            </h4>
                            <p className="mb-0 text-muted">
                              <span className="badge bg-light text-success mb-0">
                                {" "}
                                <i className="ri-arrow-up-line align-middle"></i>{" "}
                                0.63 %{" "}
                              </span>{" "}
                              vs. previous month
                            </p>
                          </div>
                          <div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-4">
                                <i className="mdi mdi-close-circle-multiple"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!-- end card body --> */}
                    </div>
                  </div>
                  {/* <!--end col--> */}
                </div>
                {/* <!--end row--> */}
                <div className="row">
                  <div
                    className={`${
                      enqSelected ? "col-lg-9 slideAnim" : "col-lg-12"
                    }`}
                  >
                    <div className="card" id="tasksList">
                      <div className="card-header border-0">
                        <div className="d-flex align-items-center">
                          <h5 className="card-title mb-0 flex-grow-1 h4">
                            {type} Enquiries
                          </h5>
                        </div>
                      </div>

                      {/* <!--end card-body--> */}
                      <div className="card-body">
                        <div className="table-responsive table-card mb-4">
                          <CommonTable
                            enquiriesData={enquiriesData}
                            type={type}
                            enquirySelect={enquirySelected}
                          />
                          {/* <!--end table--> */}
                          <div className="noresult hidden">
                            <div className="text-center">
                              <lord-icon
                                src="https://cdn.lordicon.com/msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2 h5">
                                Sorry! No Result Found
                              </h5>
                              <p className="text-muted mb-0">
                                We&apos;ve searched more than 200k+ tasks We did
                                not find any tasks for you search.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <!--end card-body--> */}
                    </div>
                    {/* <!--end card--> */}
                  </div>
                  {enqSelected && (
                    <div className="col-lg-3 pulse ">
                      <div className="card" id="contact-view-detail">
                        <div className="card-body text-center">
                          <div className="position-relative d-inline-block">
                            <img
                              src="/assets/images/users/avatar-10.jpg"
                              alt=""
                              className="avatar-lg rounded-circle img-thumbnail"
                            />
                            <span className="contact-active position-absolute rounded-circle bg-success">
                              <span className="visually-hidden"></span>
                            </span>
                          </div>
                          <h5 className="mt-4 h5">{enqSelected?.name}</h5>
                          {/* <!-- <p class="text-muted">Nesta Technologies</p> --> */}
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item avatar-xs">
                              <a
                                href="javascript:void(0);"
                                className="avatar-title bg-soft-success text-success fs-15 rounded"
                              >
                                <i className="ri-phone-line"></i>
                              </a>
                            </li>
                            <li className="list-inline-item avatar-xs">
                              <a
                                href="javascript:void(0);"
                                className="avatar-title bg-soft-danger text-danger fs-15 rounded"
                              >
                                <i className="ri-mail-line"></i>
                              </a>
                            </li>
                            <li className="list-inline-item avatar-xs">
                              <a
                                href="javascript:void(0);"
                                className="avatar-title bg-soft-warning text-warning fs-15 rounded"
                              >
                                <i className="ri-question-answer-line"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body">
                          {/* <!-- <h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6> --> */}
                          {/* <!-- <p class="text-muted mb-4">Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.</p> --> */}
                          <div className="table-responsive table-card">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td
                                    className="fw-bold py-1 text-start"
                                    width="200"
                                    scope="row"
                                  >
                                    Email ID
                                  </td>
                                  <td className="py-1 text-start">
                                    {enqSelected?.email}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="fw-bold py-1 text-start"
                                    scope="row"
                                  >
                                    Phone No
                                  </td>
                                  <td className="py-1 text-start">
                                    {enqSelected?.phone}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    valign="top"
                                    className="fw-bold text-start"
                                    scope="row"
                                  >
                                    Address
                                  </td>
                                  <td className="py-1 text-start">
                                    {enqSelected?.address}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="fw-bold py-1 text-start"
                                    scope="row"
                                  >
                                    Status
                                  </td>
                                  <td className="py-1 text-start">
                                    <span className="badge badge-soft-success fs-12">
                                      {type}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="fw-bold py-1 text-start"
                                    scope="row"
                                  >
                                    Date
                                  </td>
                                  <td className="py-1 text-start">
                                    23 August, 2023
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="fw-bold py-1 text-start"
                                    scope="row"
                                  >
                                    Last Contacted
                                  </td>
                                  <td className="py-1 text-start">
                                    15 Dec, 2021{" "}
                                    <small className="text-muted">
                                      08:58AM
                                    </small>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {/* <!--end card--> */}
                    </div>
                  )}
                  {/* <!--end col--> */}
                </div>
                {/* <!-- end row --> */}
                {/* <!-- Modal --> */}

                {/* <!--end create taks--> */}

                {/* <!-- Convert to Customer Modal --> */}
                <div
                  className="modal fade"
                  id="convertCustomer"
                  tabIndex="-1"
                  aria-labelledby="createTaskLabel"
                  aria-hidden="true"
                >
                  <CreateCustomer />
                </div>
                {/* <!-- Convert to Customer Modal End --> */}
              </div>
              {/* <!-- container-fluid --> */}
            </div>
            {/* <!-- End Page-content --> */}
            <footer className="footer w-100">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    {new Date().getFullYear()} © All Rights Reserved.
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