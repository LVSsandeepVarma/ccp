import Header from "./Header";
import "../assets/customersEdit.css"
import Select from "react-select"
import { useCustomerDetailsQuery } from "../services/api";
import {useParams} from "react-router-dom"
import Loader from "./Loader";
import ProfileForm from "./customerForms/ProfileForm";

export default function EditCustomer() {
  const params = useParams()
  const { data: customerData, isLoading, error } = useCustomerDetailsQuery({ id: params?.id, type: "PROFILE" })
  console.log(customerData, error)
  return (
    <>
      {isLoading && <Loader />}
      <div className="layout-wrapper">
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-1">
                        #589658 - {customerData?.data?.customer?.first_name}{" "}
                        {customerData?.data?.customer?.last_name}
                      </h4>
                      <p className="text-muted mb-0">Customer from Lead</p>
                    </div>
                  </div>
                  {/* <!--end card--> */}
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        <a
                          className="nav-link active show"
                          id="custom-v-pills-profile-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-profile"
                          role="tab"
                          aria-controls="custom-v-pills-profile"
                          aria-selected="true"
                        >
                          <i className="mdi mdi-account-circle"></i> Profile{" "}
                          <span className="badge rounded-pill text-bg-primary float-end">
                            1
                          </span>
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-contacts-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-contacts"
                          role="tab"
                          aria-controls="custom-v-pills-contacts"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-account-group"></i> Contacts{" "}
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-invoices-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-invoices"
                          role="tab"
                          aria-controls="custom-v-pills-invoices"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-note-text"></i> Invoices{" "}
                          <span className="badge rounded-pill text-bg-primary float-end">
                            3
                          </span>
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-payments-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-payments"
                          role="tab"
                          aria-controls="custom-v-pills-payments"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-chart-line"></i> Payments
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-proposals-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-proposals"
                          role="tab"
                          aria-controls="custom-v-pills-proposals"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-file-powerpoint"></i> Proposals{" "}
                          <span className="badge rounded-pill text-bg-primary float-end">
                            4
                          </span>
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-projects-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-projects"
                          role="tab"
                          aria-controls="custom-v-pills-projects"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-menu"></i> Projects
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-tickets-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-tickets"
                          role="tab"
                          aria-controls="custom-v-pills-tickets"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-ticket"></i> Tickets
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-files-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-files"
                          role="tab"
                          aria-controls="custom-v-pills-files"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-folder-open"></i> Files
                        </a>
                        <a
                          className="nav-link"
                          id="custom-v-pills-reminders-tab"
                          data-bs-toggle="pill"
                          href="#custom-v-pills-reminders"
                          role="tab"
                          aria-controls="custom-v-pills-reminders"
                          aria-selected="false"
                        >
                          <i className="mdi mdi-clock-time-eight-outline"></i>{" "}
                          Reminders
                        </a>
                      </div>
                    </div>
                    {/* <!-- end card-body --> */}
                  </div>
                  {/* <!--end card--> */}
                </div>
                <div className="col-lg-9">
                  <div className="tab-content text-muted mt-3 mt-lg-0">
                    <div
                      className="tab-pane fade active show"
                      id="custom-v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-profile-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Profile</h4>
                        </div>
                        <div className="card-body">
                          <div className="card mb-0">
                            <div className="card-header align-items-center d-flex">
                              <div className="flex-shrink-0 ms-2">
                                <ul
                                  className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                  role="tablist"
                                >
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-bs-toggle="tab"
                                      href="#customer-details"
                                      role="tab"
                                    >
                                      Customer Details
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-bs-toggle="tab"
                                      href="#billing-shipping"
                                      role="tab"
                                    >
                                      Billing & Shipping
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-bs-toggle="tab"
                                      href="#customer-admins"
                                      role="tab"
                                    >
                                      Customer Admins
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="card-body">
                              {/* <!-- Tab panes --> */}
                              <div className="tab-content text-muted">
                                <div
                                  className="tab-pane active"
                                  id="customer-details"
                                  role="tabpanel"
                                >
                                  <ProfileForm
                                    userInfo={customerData?.data?.customer}
                                  />
                                </div>
                                <div
                                  className="tab-pane"
                                  id="billing-shipping"
                                  role="tabpanel"
                                >
                                  <div className="row">
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                                        <h4 className="mb-0 text-2xl font-bold">
                                          Billing Address
                                        </h4>
                                        <span className="text-muted cursor-pointer">
                                          Same as Customer Info
                                        </span>
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Street
                                        </label>
                                        <textarea
                                          name="name"
                                          rows="2"
                                          className="form-control"
                                          placeholder="Address"
                                        ></textarea>
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          City
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="city"
                                          placeholder="Select City"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          State
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="state"
                                          placeholder="Select State"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Country
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="country"
                                          placeholder="Select Country"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Zip Code
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id=""
                                          placeholder="Zip Code"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-lg-6">
                                      <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
                                        <h4 className="mb-0 text-2xl font-bold">
                                          Shipping Address
                                        </h4>
                                        <span className="text-muted cursor-pointer">
                                          Copy Billing Address
                                        </span>
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Street
                                        </label>
                                        <textarea
                                          name="name"
                                          rows="2"
                                          className="form-control"
                                          placeholder="Address"
                                        ></textarea>
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          City
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="city"
                                          placeholder="Select City"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          State
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="state"
                                          placeholder="Select State"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Country
                                        </label>
                                        <Select
                                          className="js-example-basic-single"
                                          name="country"
                                          placeholder="Select Country"
                                          options={[
                                            {
                                              value: "Alabama",
                                              label: "Alabama",
                                            },
                                            {
                                              value: "Madrid",
                                              label: "Madrid",
                                            },
                                            {
                                              value: "Toronto",
                                              label: "Toronto",
                                            },
                                            {
                                              value: "Londan",
                                              label: "Londan",
                                            },
                                            {
                                              value: "Wyoming",
                                              label: "Wyoming",
                                            },
                                          ]}
                                        />
                                      </div>
                                      <div className="mt-3">
                                        <label
                                          htmlFor="placeholderInput"
                                          className="form-label"
                                        >
                                          Zip Code
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id=""
                                          placeholder="Zip Code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-end mt-3">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-info bg-info"
                                      name="button"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane"
                                  id="customer-admins"
                                  role="tabpanel"
                                >
                                  <button
                                    type="button"
                                    className="btn btn-sm btn bg-primary btn-primary mb-3"
                                    name="button"
                                  >
                                    Assign Admin
                                  </button>
                                  <table
                                    id="example"
                                    className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                                  >
                                    <thead>
                                      <tr className="bg-light">
                                        <th data-ordering="false">SR No.</th>
                                        <th data-ordering="false">
                                          Staff Member
                                        </th>
                                        <th data-ordering="false">
                                          Date Assigned
                                        </th>
                                        <th data-ordering="false">Options</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-start">01</td>
                                        <td className="text-start">
                                          Staff Name
                                        </td>
                                        <td className="text-start">
                                          <span className="badge badge-soft-info">
                                            25 Dec, 2023
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          <button className="btn badge badge-soft-danger fs-14">
                                            <i className="ri-delete-bin-fill align-bottom"></i>
                                          </button>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-start">02</td>
                                        <td className="text-start">
                                          Staff Name
                                        </td>
                                        <td className="text-start">
                                          <span className="badge badge-soft-info">
                                            25 Dec, 2023
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          <button className="btn badge badge-soft-danger fs-14">
                                            <i className="ri-delete-bin-fill align-bottom"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            {/* <!-- end card-body --> */}
                          </div>
                          {/* <!-- end card --> */}
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-contacts"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-contacts-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Contacts</h4>
                        </div>
                        <div className="card-body">
                          <table
                            id="example-1"
                            className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                          >
                            <thead>
                              <tr className="bg-light">
                                <th>SR No.</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Phone</th>
                                <th>Activity Status</th>
                                <th>Last Login</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td className="text-primary">Staff Name</td>
                                <td>mail@domainname.com</td>
                                <td>
                                  <span className="badge badge-soft-info">
                                    Position
                                  </span>
                                </td>
                                <td>+91 96585 95578</td>
                                <td>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      id="flexSwitchCheckDefault"
                                      checked
                                    />
                                  </div>
                                </td>
                                <td>25 Dec, 2023 10:15:35 AM</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-invoices"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-invoices-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Invoices</h4>
                        </div>
                        <div className="card-body">
                          <div className="mb-3 ">
                            <button
                              type="button"
                              className="btn btn-sm btn-primary bg-primary fw-bold mr-3"
                              name="button"
                              id="create_invoice_btn"
                            >
                              CREATE NEW INVOICE
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm bg-info btn-info fw-bold"
                              name="button"
                            >
                              ZIP INVOICES
                            </button>
                          </div>
                          <form
                            className="needs-validation"
                            noValidate
                            id="invoice_form"
                          >
                            <div className="card-body border-bottom border-bottom-dashed px-4 pb-4 pt-0">
                              <div className="row">
                                <div className="col-lg-12">
                                  <img
                                    src="/assets/images/ccp_logo.webp"
                                    className="card-logo card-logo-dark user-profile-image img-fluid m-auto"
                                    alt="logo dark"
                                  />
                                </div>
                                <div className="col-lg-4">
                                  <div>
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 ms-auto">
                                  <div className="text-end">
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="row g-3">
                                <div className="col-lg-3 col-sm-6">
                                  <label htmlFor="invoicenoInput">
                                    Invoice No
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="invoicenoInput"
                                    placeholder="Invoice No"
                                    value="#INV-25000355"
                                    readOnly="readonly"
                                  />
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="date-field">Date</label>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="date-field"
                                      data-provider="flatpickr"
                                      data-time="true"
                                      placeholder="Select Date-time"
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="totalamountInput">
                                      Total Amount (auto calculated)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="totalamountInput"
                                      placeholder="₹0.00"
                                      readOnly
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4 border-top border-top-dashed">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <label
                                      htmlFor="billingName"
                                      className="text-muted text-uppercase fw-semibold"
                                    >
                                      Billing Address
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingName"
                                      placeholder="Full Name"
                                      value="Mohamed Momin"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a full name
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      data-plugin="cleave-phone"
                                      id="billingPhoneno"
                                      placeholder="(123)456-7890"
                                      value="+91 90361 83631"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a phone number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingTaxno"
                                      placeholder="Tax Number"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a tax number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-12 col-sm-12">
                                  <div className="mb-2">
                                    <textarea
                                      className="form-control bg-light border-0"
                                      id="billingAddress"
                                      rows=""
                                      placeholder="Address"
                                      required
                                      readOnly
                                    >
                                      Second Floor, No-5M-323, 5th Main Road,
                                      3rd F Cross, East of NGEF Layout,
                                      Kasthuri, Bengaluru, Karnataka, India -
                                      560016
                                    </textarea>
                                    <div className="invalid-feedback">
                                      Please enter a address
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="table-responsive">
                                <table className="invoice-table table table-borderless table-nowrap mb-0">
                                  <thead className="align-middle">
                                    <tr className="table-active">
                                      <th scope="col" className="w-[50px]">
                                        #
                                      </th>
                                      <th scope="col">Product Details</th>
                                      <th scope="col" className="w-[120px]">
                                        <div className="d-flex currency-select input-light align-items-center">
                                          Rate
                                          <select
                                            className="form-selectborder-0 bg-light"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-payment-currency"
                                            onChange="otherPayment()"
                                          >
                                            <option value="$">($)</option>
                                            <option value="£">(£)</option>
                                            <option value="₹" selected>
                                              (₹)
                                            </option>
                                            <option value="€">(€)</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th scope="col" className="w-[120px]">
                                        Quantity
                                      </th>
                                      <th scope="col" className="w-[150px]">
                                        Amount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-end w-[105px]"
                                      ></th>
                                    </tr>
                                  </thead>
                                  <tbody id="newlink">
                                    <tr id="1" className="product">
                                      <th scope="row" className="product-id">
                                        1
                                      </th>
                                      <td className="text-start">
                                        <div className="mb-2">
                                          <select
                                            className="js-example-basic-single inv-select-box"
                                            id=""
                                            placeholder="product"
                                            name="country"
                                          >
                                            <option value="" disabled selected>
                                              Select Product
                                            </option>
                                            <option value="Product 1">
                                              Product 1
                                            </option>
                                            <option value="Product 2">
                                              Product 2
                                            </option>
                                            <option value="Product 3">
                                              Product 3
                                            </option>
                                            <option value="Product 4">
                                              Product 4
                                            </option>
                                            <option value="Product 5">
                                              Product 5
                                            </option>
                                          </select>
                                        </div>
                                        <textarea
                                          className="form-control bg-light border-0"
                                          id="productDetails-1"
                                          rows="2"
                                          placeholder="Product Description"
                                        ></textarea>
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control product-price bg-light border-0"
                                          id="productRate-1"
                                          step="0.01"
                                          placeholder="0.00"
                                          required
                                        />
                                        <div className="invalid-feedback">
                                          Please enter a rate
                                        </div>
                                      </td>
                                      <td>
                                        <div className="input-step">
                                          <button
                                            type="button"
                                            className="minus"
                                          >
                                            –
                                          </button>
                                          <input
                                            type="number"
                                            className="product-quantity"
                                            id="product-qty-1"
                                            value="0"
                                            readOnly
                                          />
                                          <button
                                            type="button"
                                            className="plus"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="text-end">
                                        <div>
                                          <input
                                            type="text"
                                            className="form-control bg-light border-0 product-line-price"
                                            id="productPrice-1"
                                            placeholder="$0.00"
                                            readOnly
                                          />
                                        </div>
                                      </td>
                                      <td className="product-removal">
                                        <a
                                          href="javascript:void(0)"
                                          className="btn btn-success bg-success"
                                        >
                                          Delete
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr id="newForm hidden">
                                      <td className="d-none" colSpan="5">
                                        <p>Add New Form</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="5">
                                        <a
                                          href="javascript:new_link()"
                                          id="add-item"
                                          className="btn btn-soft-secondary fw-medium"
                                        >
                                          <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                                          Add Item
                                        </a>
                                      </td>
                                    </tr>
                                    <tr className="border-top border-top-dashed mt-2">
                                      <td colSpan="3"></td>
                                      <td colSpan="2" className="p-0">
                                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                          <tbody>
                                            <tr>
                                              <th scope="row">Sub Total</th>
                                              <td className="w-[150px]">
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-subtotal"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Discount %
                                                <small className="text-muted">
                                                  (Before Tax)
                                                </small>
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-discount"
                                                  placeholder="0%"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Tax (18%)</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-tax"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Shipping Charge
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-shipping"
                                                  placeholder="₹0.00"
                                                />
                                              </td>
                                            </tr>
                                            <tr className="border-top border-top-dashed">
                                              <th scope="row">Total Amount</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-total"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        {/* <!--end table--> */}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!--end table--> */}
                              </div>

                              <div className="mt-4">
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label text-muted text-uppercase fw-semibold"
                                >
                                  NOTES
                                </label>
                                <textarea
                                  className="form-control alert alert-info"
                                  id="exampleFormControlTextarea1"
                                  placeholder="Notes"
                                  rows="2"
                                  required
                                >
                                  All accounts are to be paid within 7 days from
                                  receipt of invoice. To be paid by cheque or
                                  credit card or direct payment online. If
                                  account is not paid within 7 days the credits
                                  details supplied as confirmation of work
                                  undertaken will be charged the agreed quoted
                                  fee noted above.
                                </textarea>
                              </div>
                              <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                <a
                                  href="javascript:void(0);"
                                  className="btn  btn-success"
                                >
                                  <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                  Save
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-primary bg-primary"
                                >
                                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                                  Download Invoice
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-secondary bg-secondary"
                                >
                                  <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                                  Send Invoice
                                </a>
                              </div>
                            </div>
                          </form>
                          <div className="invoices-cards-table">
                            <div className="row h-100">
                              <div className="col-lg-4 col-md-6">
                                <div className="card border">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                                          <i className="ri-money-dollar-circle-fill align-middle"></i>
                                        </span>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                                          Outstanding Invoices
                                        </p>
                                        <h4 className=" mb-0">
                                          ₹
                                          <span
                                            className="counter-value"
                                            data-target="2390.68"
                                          >
                                            2,390.68
                                          </span>
                                        </h4>
                                      </div>
                                      <div className="flex-shrink-0 align-self-end">
                                        <span className="badge badge-soft-success">
                                          <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                                          6.24 %<span> </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- end card body --> */}
                                </div>
                                {/* <!-- end card --> */}
                              </div>
                              {/* <!-- end col --> */}
                              <div className="col-lg-4 col-md-6">
                                <div className="card border">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-light text-secondary rounded-circle fs-3">
                                          <i className="ri-arrow-up-circle-fill align-middle"></i>
                                        </span>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                                          {" "}
                                          Past Due Invoices
                                        </p>
                                        <h4 className=" mb-0">
                                          ₹
                                          <span
                                            className="counter-value"
                                            data-target="19523.25"
                                          >
                                            19,523.25
                                          </span>
                                        </h4>
                                      </div>
                                      <div className="flex-shrink-0 align-self-end">
                                        <span className="badge badge-soft-success">
                                          <i className="ri-arrow-up-s-fill align-middle me-1"></i>
                                          3.67 %<span> </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- end card body --> */}
                                </div>
                                {/* <!-- end card --> */}
                              </div>
                              {/* <!-- end col --> */}
                              <div className="col-lg-4 col-md-6">
                                <div className="card border">
                                  <div className="card-body">
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm flex-shrink-0">
                                        <span className="avatar-title bg-light text-success rounded-circle fs-3">
                                          <i className="ri-arrow-down-circle-fill align-middle"></i>
                                        </span>
                                      </div>
                                      <div className="flex-grow-1 ms-3">
                                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                                          Paid Invoices
                                        </p>
                                        <h4 className=" mb-0">
                                          ₹
                                          <span
                                            className="counter-value"
                                            data-target="14799.44"
                                          >
                                            14,799.44
                                          </span>
                                        </h4>
                                      </div>
                                      <div className="flex-shrink-0 align-self-end">
                                        <span className="badge badge-soft-danger">
                                          <i className="ri-arrow-down-s-fill align-middle me-1"></i>
                                          4.80 %<span> </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- end card body --> */}
                                </div>
                                {/* <!-- end card --> */}
                              </div>
                              {/* <!-- end col --> */}
                            </div>
                            <table
                              id="tbl_invoices"
                              className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                            >
                              <thead>
                                <tr className="bg-light">
                                  <th>Invoice No.</th>
                                  <th>Amount</th>
                                  <th>Total Tax</th>
                                  <th>Date</th>
                                  <th>Project</th>
                                  <th>Tags</th>
                                  <th>Due Date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>INV-006150/11/2023</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>₹250.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span className="badge badge-soft-danger fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-danger">
                                      Unpaid
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>INV-006150/11/2023</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>₹250.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span className="badge badge-soft-danger fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-success">
                                      Paid
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>INV-006150/11/2023</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>₹250.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <span className="badge badge-soft-danger fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-info">
                                      Partially Paid
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-payments"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-payments-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Payments</h4>
                        </div>
                        <div className="card-body">
                          <table
                            id="tbl_payments"
                            className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                          >
                            <thead>
                              <tr className="bg-light">
                                <th>Payment No.</th>
                                <th>Invoice No.</th>
                                <th>Payment Mode</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">9585</td>
                                <td className="text-info">
                                  INV-006150/11/2023
                                </td>
                                <td>Bank Account</td>
                                <td>T2310281156422766770183</td>
                                <td>
                                  <span className="badge badge-soft-success fs-12">
                                    ₹250.00
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-proposals"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-proposals-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Proposals</h4>
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <button
                              type="button"
                              className="btn btn-sm btn_primary fw-bold"
                              name="button"
                              id="create_proposal_btn"
                            >
                              NEW PROPOSAL
                            </button>
                          </div>
                          <div className="proposals-table">
                            <table
                              id="tbl_proposals"
                              className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                            >
                              <thead>
                                <tr className="bg-light">
                                  <th>Proposal No.</th>
                                  <th>Subject</th>
                                  <th>Total</th>
                                  <th>Date</th>
                                  <th>Open Till</th>
                                  <th>Created Date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-info">
                                    PRO-006150/11/2023
                                  </td>
                                  <td>Test subject</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-success fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-dark">
                                      Draft
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-info">
                                    PRO-006150/11/2023
                                  </td>
                                  <td>Test subject</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-success fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-warning">
                                      Sent
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-info">
                                    PRO-006150/11/2023
                                  </td>
                                  <td>Test subject</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-success fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-success">
                                      Accepted
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-info">
                                    PRO-006150/11/2023
                                  </td>
                                  <td>Test subject</td>
                                  <td className="text-primary">₹25,000.00</td>
                                  <td>
                                    <span className="badge badge-soft-info fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-primary fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-soft-success fs-12">
                                      20/11/2023
                                    </span>
                                  </td>
                                  <td>
                                    <span className="badge badge-outline-danger">
                                      Rejected
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <form
                            className="needs-validation"
                            noValidate
                            id="proposal_form"
                          >
                            <div className="card-body border-bottom border-bottom-dashed px-4 pb-4 pt-0">
                              <div className="row">
                                <div className="col-lg-12">
                                  <img
                                    src="assets/images/ccp_logo.webp"
                                    className="card-logo card-logo-dark user-profile-image img-fluid m-auto"
                                    alt="logo dark"
                                  />
                                </div>
                                <div className="col-lg-4">
                                  <div>
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 ms-auto">
                                  <div className="text-end">
                                    <p className="mb-0 test-dark fw-bold fs-16">
                                      Client/Company Name
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Second Floor, No-5M-323, 5th Main Road,
                                      <br /> 3rd F Cross, East of NGEF Layout,
                                      Kasthuri,
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      Bengaluru, Karnataka
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      India - 560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      GST - GSTIN5415560016
                                    </p>
                                    <p className="mb-0 test-dark fs-14">
                                      +91 90361 56001
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="row g-3">
                                <div className="col-lg-3 col-sm-6">
                                  <label htmlFor="invoicenoInput">
                                    Proposal No
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="invoicenoInput"
                                    placeholder="Invoice No"
                                    value="#PRO25000355"
                                    readOnly="readonly"
                                  />
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="date-field">Date</label>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="date-field"
                                      data-provider="flatpickr"
                                      data-time="true"
                                      placeholder="Select Date-time"
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-3 col-sm-6">
                                  <div>
                                    <label htmlFor="totalamountInput">
                                      Total Amount (auto calculated)
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="totalamountInput"
                                      placeholder="₹0.00"
                                      readOnly
                                    />
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4 border-top border-top-dashed">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <label
                                      htmlFor="billingName"
                                      className="text-muted text-uppercase fw-semibold"
                                    >
                                      Billing Address
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingName"
                                      placeholder="Full Name"
                                      value="Mohamed Momin"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a full name
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-2">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      data-plugin="cleave-phone"
                                      id="billingPhoneno"
                                      placeholder="(123)456-7890"
                                      value="+91 90361 83631"
                                      readOnly
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a phone number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-4 col-sm-6">
                                  <div className="mb-3">
                                    <input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="billingTaxno"
                                      placeholder="Tax Number"
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Please enter a tax number
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                                <div className="col-lg-12 col-sm-12">
                                  <div className="mb-2">
                                    <textarea
                                      className="form-control bg-light border-0"
                                      id="billingAddress"
                                      rows=""
                                      placeholder="Address"
                                      required
                                      readOnly
                                    >
                                      Second Floor, No-5M-323, 5th Main Road,
                                      3rd F Cross, East of NGEF Layout,
                                      Kasthuri, Bengaluru, Karnataka, India -
                                      560016
                                    </textarea>
                                    <div className="invalid-feedback">
                                      Please enter a address
                                    </div>
                                  </div>
                                </div>
                                {/* <!--end col--> */}
                              </div>
                              {/* <!--end row--> */}
                            </div>
                            <div className="card-body p-4">
                              <div className="table-responsive">
                                <table className="invoice-table table table-borderless table-nowrap mb-0">
                                  <thead className="align-middle">
                                    <tr className="table-active">
                                      <th scope="col" className="w-[50px]">
                                        #
                                      </th>
                                      <th scope="col">Product Details</th>
                                      <th scope="col" className="w-[120px]">
                                        <div className="d-flex currency-select input-light align-items-center">
                                          Rate
                                          <select
                                            className="form-selectborder-0 bg-light"
                                            data-choices
                                            data-choices-search-false
                                            id="choices-payment-currency"
                                            onChange="otherPayment()"
                                          >
                                            <option value="$">($)</option>
                                            <option value="£">(£)</option>
                                            <option value="₹" selected>
                                              (₹)
                                            </option>
                                            <option value="€">(€)</option>
                                          </select>
                                        </div>
                                      </th>
                                      <th scope="col" className="w-[120px]">
                                        Quantity
                                      </th>
                                      <th scope="col" className="w-[150px]">
                                        Amount
                                      </th>
                                      <th
                                        scope="col"
                                        className="text-end w-[105px]"
                                      ></th>
                                    </tr>
                                  </thead>
                                  <tbody id="newlink">
                                    <tr id="1" className="product">
                                      <th scope="row" className="product-id">
                                        1
                                      </th>
                                      <td className="text-start">
                                        <div className="mb-2">
                                          <select
                                            className="js-example-basic-single inv-select-box"
                                            id="productName-1"
                                            placeholder="product"
                                            name="country"
                                          >
                                            <option value="" disabled selected>
                                              Select Product
                                            </option>
                                            <option value="Product 1">
                                              Product 1
                                            </option>
                                            <option value="Product 2">
                                              Product 2
                                            </option>
                                            <option value="Product 3">
                                              Product 3
                                            </option>
                                            <option value="Product 4">
                                              Product 4
                                            </option>
                                            <option value="Product 5">
                                              Product 5
                                            </option>
                                          </select>
                                        </div>
                                        <textarea
                                          className="form-control bg-light border-0"
                                          id="productDetails-1"
                                          rows="2"
                                          placeholder="Product Description"
                                        ></textarea>
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          className="form-control product-price bg-light border-0"
                                          id="productRate-1"
                                          step="0.01"
                                          placeholder="0.00"
                                          required
                                        />
                                        <div className="invalid-feedback">
                                          Please enter a rate
                                        </div>
                                      </td>
                                      <td>
                                        <div className="input-step">
                                          <button
                                            type="button"
                                            className="minus"
                                          >
                                            –
                                          </button>
                                          <input
                                            type="number"
                                            className="product-quantity"
                                            id="product-qty-1"
                                            value="0"
                                            readOnly
                                          />
                                          <button
                                            type="button"
                                            className="plus"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="text-end">
                                        <div>
                                          <input
                                            type="text"
                                            className="form-control bg-light border-0 product-line-price"
                                            id="productPrice-1"
                                            placeholder="$0.00"
                                            readOnly
                                          />
                                        </div>
                                      </td>
                                      <td className="product-removal">
                                        <a
                                          href="javascript:void(0)"
                                          className="btn btn-success bg-success"
                                        >
                                          Delete
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tbody>
                                    <tr id="newForm hidden">
                                      <td className="d-none" colSpan="5">
                                        <p>Add New Form</p>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="5">
                                        <a
                                          href="javascript:new_link()"
                                          id="add-item"
                                          className="btn btn-soft-secondary fw-medium"
                                        >
                                          <i className="ri-add-fill me-1 align-bottom"></i>{" "}
                                          Add Item
                                        </a>
                                      </td>
                                    </tr>
                                    <tr className="border-top border-top-dashed mt-2">
                                      <td colSpan="3"></td>
                                      <td colSpan="2" className="p-0">
                                        <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                          <tbody>
                                            <tr>
                                              <th scope="row">Sub Total</th>
                                              <td className="w-[150px]">
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-subtotal"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Discount %
                                                <small className="text-muted">
                                                  (Before Tax)
                                                </small>
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-discount"
                                                  placeholder="0%"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Tax (18%)</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-tax"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <th scope="row">
                                                Shipping Charge
                                              </th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-shipping"
                                                  placeholder="₹0.00"
                                                />
                                              </td>
                                            </tr>
                                            <tr className="border-top border-top-dashed">
                                              <th scope="row">Total Amount</th>
                                              <td>
                                                <input
                                                  type="text"
                                                  className="form-control bg-light border-0"
                                                  id="cart-total"
                                                  placeholder="₹0.00"
                                                  readOnly
                                                />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        {/* <!--end table--> */}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!--end table--> */}
                              </div>

                              <div className="mt-4">
                                <label
                                  htmlFor="exampleFormControlTextarea1"
                                  className="form-label text-muted text-uppercase fw-semibold"
                                >
                                  NOTES
                                </label>
                                <textarea
                                  className="form-control alert alert-info"
                                  id="exampleFormControlTextarea1"
                                  placeholder="Notes"
                                  rows="2"
                                  required
                                >
                                  All accounts are to be paid within 7 days from
                                  receipt of invoice. To be paid by cheque or
                                  credit card or direct payment online. If
                                  account is not paid within 7 days the credits
                                  details supplied as confirmation of work
                                  undertaken will be charged the agreed quoted
                                  fee noted above.
                                </textarea>
                              </div>
                              <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                <button
                                  type="submit"
                                  className="btn btn-success bg-success"
                                >
                                  <i className="ri-printer-line align-bottom me-1"></i>{" "}
                                  Save
                                </button>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn_primary"
                                >
                                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                                  Download Proposal
                                </a>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-secondary bg-secondary"
                                >
                                  <i className="ri-send-plane-fill align-bottom me-1"></i>{" "}
                                  Send Proposal
                                </a>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-projects"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-projects-tab"
                    >
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title mb-0">Projects</h4>
                        </div>
                        <div className="card-body"></div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-tickets"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-tickets-tab"
                    >
                      <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h4 className="card-title mb-0">Tickets</h4>
                          <button
                            type="button"
                            className="btn btn-info bg-info btn-sm w-sm waves-effect waves-light"
                            name="button"
                          >
                            Create Ticket
                          </button>
                        </div>
                        <div className="card-body">
                          {/* <!-- <div class="col-xxl-6 col-md-6 d-grid">
                                  <label for="placeholderInput" class="form-label">Tags</label>
                                  <input type="text" class="form-control" id="tags" data-role="tagsinput" placeholder="Type and press enter">
                               </div> --> */}
                          <table
                            id="tbl_tickets"
                            className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                          >
                            <thead>
                              <tr className="bg-light">
                                <th>Ticket No.</th>
                                <th>Subject</th>
                                <th>Tags</th>
                                <th>Department</th>
                                <th>Service</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Last Reply</th>
                                <th>Created Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-info">00615</td>
                                <td>Ticket subject</td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 1
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 2
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 3
                                  </span>
                                </td>
                                <td>Dept Name</td>
                                <td>Service</td>
                                <td>Contact</td>
                                <td className="text-center">
                                  <span className="badge badge-outline-info">
                                    In progress
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="badge badge-soft-warning fs-12">
                                    Medium
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">00615</td>
                                <td>Ticket subject</td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 1
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 2
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 3
                                  </span>
                                </td>
                                <td>Dept Name</td>
                                <td>Service</td>
                                <td>Contact</td>
                                <td className="text-center">
                                  <span className="badge badge-outline-danger">
                                    Not Started
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="badge badge-soft-success fs-12">
                                    Low
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-info">00615</td>
                                <td>Ticket subject</td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 1
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 2
                                  </span>
                                  <span className="badge badge-soft-info fs-12">
                                    tag 3
                                  </span>
                                </td>
                                <td>Dept Name</td>
                                <td>Service</td>
                                <td>Contact</td>
                                <td className="text-center">
                                  <span className="badge badge-outline-success">
                                    Closed
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="badge badge-soft-danger fs-12">
                                    High
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-primary fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-soft-info fs-12">
                                    20/11/2023
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-files"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-files-tab"
                    >
                      <div className="card">
                        <div className="card-header d-flex align-items-center mb-4">
                          <h4 className="card-title mb-0 flex-grow-1 mb-0">
                            Files
                          </h4>
                          <div className="flex-shrink-0">
                            <input
                              className="form-control d-none"
                              type="file"
                              id="formFile"
                            />
                            <label
                              htmlFor="formFile"
                              className="btn btn-info bg-info btn-sm mb-0"
                            >
                              <i className="ri-upload-2-fill me-1 align-bottom"></i>{" "}
                              Upload File
                            </label>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th scope="col">File Name</th>
                                      <th scope="col">Type</th>
                                      <th scope="col">Size</th>
                                      <th scope="col">Upload Date</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                              <i className="ri-file-zip-fill"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0)">
                                                Artboard-documents.zip
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>Zip File</td>
                                      <td>4.57 MB</td>
                                      <td>12 Dec 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink15"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink15"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                              <i className="ri-file-pdf-fill"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0);">
                                                Bank Management System
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>PDF File</td>
                                      <td>8.89 MB</td>
                                      <td>24 Nov 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink3"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink3"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-secondary text-secondary rounded fs-20">
                                              <i className="ri-video-line"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0);">
                                                Tour-video.mp4
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>MP4 File</td>
                                      <td>14.62 MB</td>
                                      <td>19 Nov 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink4"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink4"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-success text-success rounded fs-20">
                                              <i className="ri-file-excel-fill"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0);">
                                                Account-statement.xsl
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>XSL File</td>
                                      <td>2.38 KB</td>
                                      <td>14 Nov 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink5"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink5"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle text-muted"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle text-muted"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li className="dropdown-divider"></li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-info text-info rounded fs-20">
                                              <i className="ri-folder-line"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0);">
                                                Project Screenshots Collection
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>Floder File</td>
                                      <td>87.24 MB</td>
                                      <td>08 Nov 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink6"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink6"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="avatar-sm">
                                            <div className="avatar-title bg-soft-danger text-danger rounded fs-20">
                                              <i className="ri-image-2-fill"></i>
                                            </div>
                                          </div>
                                          <div className="ms-3 flex-grow-1">
                                            <h6 className="fs-15 mb-0">
                                              <a href="javascript:void(0);">
                                                Velzon-logo.png
                                              </a>
                                            </h6>
                                          </div>
                                        </div>
                                      </td>
                                      <td>PNG File</td>
                                      <td>879 KB</td>
                                      <td>02 Nov 2021</td>
                                      <td>
                                        <div className="dropdown">
                                          <a
                                            href="javascript:void(0);"
                                            className="btn btn-light btn-icon"
                                            id="dropdownMenuLink7"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="true"
                                          >
                                            <i className="ri-equalizer-fill"></i>
                                          </a>
                                          <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuLink7"
                                          >
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-eye-fill me-2 align-middle"></i>
                                                View
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-download-2-fill me-2 align-middle"></i>
                                                Download
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                              >
                                                <i className="ri-delete-bin-5-line me-2 align-middle"></i>
                                                Delete
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}

                    <div
                      className="tab-pane fade"
                      id="custom-v-pills-reminders"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-reminders-tab"
                    >
                      <div className="card">
                        <div className="card-header d-flex align-items-center mb-4">
                          <h4 className="card-title mb-0 flex-grow-1 mb-0">
                            Reminders
                          </h4>
                          <div className="flex-shrink-0">
                            <button
                              type="button"
                              className="btn btn-sm btn-info bg-info"
                              name="button"
                              data-bs-toggle="modal"
                              data-bs-target="#remindersModal"
                            >
                              <i className="mdi mdi-bell-outline me-1"></i> Set
                              Reminder
                            </button>
                          </div>
                        </div>
                        <div className="card-body">
                          <table
                            id="tbl_reminders"
                            className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
                          >
                            <thead>
                              <tr className="bg-light">
                                <th>Sl No.</th>
                                <th>Description</th>
                                <th>Reminder Date</th>
                                <th>Remind To</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>01</td>
                                <td className="text-info">
                                  Reminder description test
                                </td>
                                <td>12/10/2024 12:00 AM</td>
                                <td className="">
                                  <span className="badge badge-outline-info">
                                    Mohamed Momin
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* <!--end tab-pane--> */}
                  </div>
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