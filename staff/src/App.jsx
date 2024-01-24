import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Signin from './Pages/Signin';
import Dashboard from './Pages/Dashboard';
import NewEnquiries from './Pages/Enquiries/New';
import Ringing from './Pages/Enquiries/Ringing';
import Postponed from './Pages/Enquiries/Postponed';
import NotInterested from './Pages/Enquiries/NotIntrested';
import Review from './Pages/Enquiries/Review';
import Signed from './Pages/Enquiries/Signed';
import Customers from './Pages/Customers';
import EditCustomer from './Pages/EditCustomer';
import Inbound from './Pages/callRecords/Inbound';
import Outbound from './Pages/callRecords/Outbound';
import InboundMissed from './Pages/callRecords/InboundMissed';
import OutboundMissed from './Pages/callRecords/OutboundMissed';
import Tickets from './Pages/tickets/Tickets';
import TicketDetails from './Pages/tickets/TicketDetails';
import AllInvoices from './Pages/invoices/invoice/AllInvoices';
import PaidInvoices from './Pages/invoices/invoice/Paid';
import UnpaidInvoices from './Pages/invoices/invoice/Unpaid';
import DueInvoices from './Pages/invoices/invoice/Due';
import PartiallyPaidInvoices from './Pages/invoices/invoice/PartiallyPaid';
import AllRecurringInvoices from './Pages/invoices/recurringInvoice/AllInvoices';
import PaidRecurringInvoices from './Pages/invoices/recurringInvoice/Paid';
import UnpaidRecurringInvoices from './Pages/invoices/recurringInvoice/Unpaid';
import DueRecurringInvoices from './Pages/invoices/recurringInvoice/Due';
import PartiallyPaidRecurringInvoices from './Pages/invoices/recurringInvoice/PartiallyPaid';
import All from './Pages/invoices/proposal/AllInvoices';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import ProfileChat from './Pages/ProfileChat';
import Help from './Pages/Help';
import LockScreen from './Pages/LockedScreen';
import AuthWrapper from './AuthWrapper';
import ForgotPassword from './Pages/ForgotPassword';
import OTPVerification from './Pages/Opt';
import ResetPassword from './Pages/resetPassword';
import SessionExpired from './Pages/sessionExpired';
import AcceptedProposals from './Pages/invoices/proposal/Accepted';
import DeclinedProposals from './Pages/invoices/proposal/Declined';
import PendingProposals from './Pages/invoices/proposal/Pending';
import SentProposals from './Pages/invoices/proposal/Sent';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();

    
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/lockscreen" element={<LockScreen />}></Route>
          <Route path="/:id" element={<OTPVerification />}></Route>
          <Route path="/reset-password/:id" element={<ResetPassword />}></Route>
          <Route path="/session-expired" element={<SessionExpired />}></Route>

          {/* enquiries routes start */}
          <Route
            path="/"
            element={
              <AuthWrapper>
                <Outlet />
              </AuthWrapper>
            }
          >
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/enquiries/new" element={<NewEnquiries />}></Route>
            <Route path="/enquiries/ringing" element={<Ringing />}></Route>
            <Route path="/enquiries/postponed" element={<Postponed />}></Route>
            <Route
              path="/enquiries/not-interested"
              element={<NotInterested />}
            ></Route>
            <Route path="/enquiries/review" element={<Review />}></Route>
            <Route path="/enquiries/signed" element={<Signed />}></Route>
            {/* enquiries routes end */}

            {/* customer routes */}
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/edit-customer/:id" element={<EditCustomer />}></Route>

            {/* call record routes */}
            <Route path="/calls/inbound" element={<Inbound />}></Route>
            <Route path="/calls/outbound" element={<Outbound />}></Route>
            <Route
              path="/calls/inbound-missed"
              element={<InboundMissed />}
            ></Route>
            <Route
              path="/calls/outbound-missed"
              element={<OutboundMissed />}
            ></Route>

            {/* ticket routes */}
            <Route path="/tickets" element={<Tickets />}></Route>
            <Route path="/ticket-details" element={<TicketDetails />}></Route>

            {/* invoices routes */}
            <Route path="/all-invoices" element={<AllInvoices />}></Route>
            <Route path="/paid-invoices" element={<PaidInvoices />}></Route>
            <Route path="/unpaid-invoices" element={<UnpaidInvoices />}></Route>
            <Route path="/due-invoices" element={<DueInvoices />}></Route>
            <Route
              path="/partially-paid-invoices"
              element={<PartiallyPaidInvoices />}
            ></Route>

            {/* Recurring invoices routes */}
            <Route
              path="/recurring/all-invoices"
              element={<AllRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/paid-invoices"
              element={<PaidRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/unpaid-invoices"
              element={<UnpaidRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/due-invoices"
              element={<DueRecurringInvoices />}
            ></Route>
            <Route
              path="/recurring/partially-paid-invoices"
              element={<PartiallyPaidRecurringInvoices />}
            ></Route>

            {/* proposal routes */}
            <Route path="/proposal/all" element={<All />}></Route>
            <Route
              path="/proposal/accepted"
              element={<AcceptedProposals />}
            ></Route>
            <Route
              path="/proposal/declined"
              element={<DeclinedProposals />}
            ></Route>
            <Route
              path="/proposal/pending"
              element={<PendingProposals />}
            ></Route>
            <Route path="/proposal/sent" element={<SentProposals />}></Route>

            {/* products routes */}
            <Route path="/products" element={<Products />}></Route>

            {/* profile routes */}
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profile-chat" element={<ProfileChat />}></Route>
            <Route path="/faq" element={<Help />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
