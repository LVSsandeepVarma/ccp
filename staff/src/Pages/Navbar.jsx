// import "../../public/assets/css/app.css"
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation()
  return (
    <>
      <div className="app-menu navbar-menu">
        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    location?.pathname === "/" ||
                    location?.pathname == "/dashboard"
                      ? "active"
                      : ""
                  }`}
                  href="/dashboard"
                >
                  <i className="ri-dashboard-2-line"></i>
                  <span data-key="t-dashboard">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link collapsed ${
                    location?.pathname?.includes("/enquiries") ? "active" : ""
                  }`}
                  // href="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-headphone-line"></i>
                  <span data-key="t-enquiries">Enquiries</span>
                </a>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="/enquiries/new"
                        className="nav-link"
                        data-key="t-newenq"
                      >
                        <i className="mdi mdi-phone"></i> New{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/enquiries/ringing"
                        className="nav-link"
                        data-key="t-ringing"
                      >
                        <i className="mdi mdi-phone-ring"></i> Ringing{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/enquiries/postponed"
                        className="nav-link"
                        data-key="t-postponed"
                      >
                        <i className="mdi mdi-phone-plus-outline"></i> Postponed{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/enquiries/not-interested"
                        className="nav-link"
                        data-key="t-not-interested"
                      >
                        <i className="mdi mdi-phone-off"></i> Not Interested{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/enquiries/signed"
                        className="nav-link"
                        data-key="t-signed"
                      >
                        <i className="mdi mdi-file-sign"></i> Signed{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/enquiries/review"
                        className="nav-link"
                        data-key="t-review"
                      >
                        <i className="mdi mdi-phone-log-outline"></i> Review{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/customers") ? "active" : ""
                  }`}
                  href="/customers"
                >
                  <i className="mdi mdi-human-queue"></i>
                  <span data-key="t-customers">Customers</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link collapsed ${
                    location?.pathname?.includes("/calls") ? "active" : ""
                  }`}
                  // href="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="mdi mdi-phone-log-outline"></i>{" "}
                  <span data-key="t-call-recorde">Call Records</span>
                </a>
                <div className=" menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="/calls/inbound"
                        className="nav-link"
                        data-key="t-inbound"
                      >
                        <i className="mdi mdi-phone-incoming-outline"></i>{" "}
                        Inbound{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/calls/outbound"
                        className="nav-link"
                        data-key="t-outbound"
                      >
                        <i className="mdi mdi-phone-outgoing-outline"></i>{" "}
                        Outbound{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/calls/inbound-missed"
                        className="nav-link"
                        data-key="t-inbound-missed"
                      >
                        <i className="mdi mdi-phone-missed-outline"></i> Inbound
                        Missed{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/calls/outbound-missed"
                        className="nav-link"
                        data-key="t-outbound-missed"
                      >
                        <i className="mdi mdi-phone-missed-outline"></i>{" "}
                        Outbound Missed{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    location?.pathname?.includes("/tickets") ? "active" : ""
                  }`}
                  href="/tickets"
                >
                  <i className="mdi mdi-ticket"></i>
                  <span data-key="t-tickets">Tickets</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link collapsed ${
                    location?.pathname?.includes("-invoices") ? "active" : ""
                  }`}
                  // href="#sidebarLayouts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                >
                  <i className="mdi mdi-file-document-multiple-outline"></i>{" "}
                  <span data-key="t-invoices">Invoices</span>{" "}
                  <span className="badge badge-pill bg-danger" data-key="t-hot">
                    Hot
                  </span>
                </a>
                <div className=" menu-dropdown" id="sidebarLayouts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="#sidebarInvoice"
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarInvoice"
                      >
                        <i className="mdi mdi-file-document-outline"></i>{" "}
                        Invoice{" "}
                      </a>
                      <div className=" menu-dropdown" id="sidebarInvoice">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a href="/all-invoices" className="nav-link">
                              <i className=" mdi mdi-format-list-bulleted"></i>{" "}
                              All
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/paid-invoices"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-cash-check"></i> Paid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/unpaid-invoices"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-cash-remove"></i> Unpaid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/partially-paid-invoices"
                              className="nav-link text-info"
                            >
                              <i className="mdi mdi-cash-refund"></i> Partially
                              Paid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/due-invoices"
                              className="nav-link text-warning"
                            >
                              <i className="mdi mdi-cash-refund"></i> Due
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarInvoice"
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarInvoice"
                      >
                        <i className="mdi mdi-file-document-multiple-outline"></i>{" "}
                        Recurring Invoice{" "}
                      </a>
                      <div className=" menu-dropdown" id="sidebarInvoice">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="/recurring/all-invoices"
                              className="nav-link"
                            >
                              <i className=" mdi mdi-format-list-bulleted"></i>{" "}
                              All
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/recurring/paid-invoices"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-cash-check"></i> Paid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/recurring/unpaid-invoices"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-cash-remove"></i> Unpaid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/recurring/partially-paid-invoices"
                              className="nav-link text-info"
                            >
                              <i className="mdi mdi-cash-refund"></i> Partially
                              Paid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/recurring/due-invoices"
                              className="nav-link text-warning"
                            >
                              <i className="mdi mdi-cash-refund"></i> Due
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarProposal"
                        className="nav-link collapsed"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarProposal"
                      >
                        <i className="mdi mdi-file-edit"></i> Proposal{" "}
                      </a>
                      <div className=" menu-dropdown" id="sidebarProposal">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a href="proposal/all" className="nav-link">
                              <i className=" mdi mdi-format-list-bulleted"></i>{" "}
                              All
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/proposal/accepted"
                              className="nav-link text-success"
                            >
                              <i className=" mdi mdi-file-check-outline"></i>{" "}
                              Accepted
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/proposal/declined"
                              className="nav-link text-danger"
                            >
                              <i className=" mdi mdi-file-cancel-outline"></i>{" "}
                              Declined
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="/proposal/sent"
                              className="nav-link text-warning"
                            >
                              <i className="mdi mdi-file-move-outline"></i> Sent
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link collapsed ${
                    location?.pathname?.includes("/products") ? "active" : ""
                  }`}
                  // href="#products"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="products"
                >
                  <i className="mdi mdi-archive"></i>{" "}
                  <span data-key="t-products">Products</span>
                </a>
                <div className="menu-dropdown " id="products">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="/products"
                        className="nav-link active"
                        data-key="t-products-vn"
                      >
                        {" "}
                        Virtual Number{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#toll-number"
                        className="nav-link"
                        data-key="t-products-toll-no"
                      >
                        {" "}
                        Toll Number{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#voice-broadcast"
                        className="nav-link"
                        data-key="t-products-voice-broadcast"
                      >
                        {" "}
                        Voice Broadcast{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/products#corporate-plans"
                        className="nav-link"
                        data-key="t-products-voice-broadcast"
                      >
                        {" "}
                        Corporate Plan{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* <!-- Sidebar --> */}
        </div>

        <div className="sidebar-background"></div>
      </div>
    </>
  );
}
