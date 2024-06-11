import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import UserPage from "../components/user/UserPage";
// import LoginPage from "../components/LoginPage";
import { AuthProvider } from "react-auth-kit";
import refreshApi from "../QueryApiCalls/refreshApi";
import UserSelfPage from "../components/user/UserSelfPage";
import EventsPage from "../components/Events/Events.page";
import UserLeavesPage from "../components/user/UserLeavesPage";
import LeaveApprovalPage from "../components/LeaveApprovals/LeaveApprovalPage";
import UserAttendanceRegPage from "../components/AttendanceRegularization/UserAttendanceRegPage";
import UserAttendanceRequestApprove from "../components/AttendanceRegularization/UserAttendanceRequestApprove";
import AddUserPage from "../components/user/AddUserPage";
import UserResignation from "../components/Resignation/UserResignation";
import ResignationApprovals from "../components/Resignation/ResignationApprovals";
import AllAttendanceDetails from "../components/AttendanceAdmin/AllAttendanceDetails";
import OrganizationDetails from "../components/Organization/OrganizationDetails";
import EditUserPage from "../components/user/EditUserPage";
import { UserInfoStore } from "../utils/useUserInfoStore";
import { useNavigate } from 'react-router-dom';
import HrPolicyPage from "../components/HrPolicy/HrPolicyPage";
import UserDailyLogs from "../components/DailyLogs/UserDailyLogs";
import ChangePasswordPage from "../components/Login/ChangePasswordPage";
import LoginPage from "../components/Login/LoginPage";
import AdvanceRequestPage from "../components/Advance/AdvanceRequestPage";
import ProductionReportsPage from "../components/ProductionReports/ProductionReportaPage";
import RaiseTicket from "../components/ITSupport/RaiseTicket";
import OnBoardForm from "../components/OnBoardForm/onBoardForm";
import OnBoardRequest from "../components/OnBoardForm/onBoardRequest";
import NewDashBoard from "../components/NewDashboard";
import TeamAttendance from "../components/AttendanceAdmin/TeamAttendance";

function AppRoutes() {
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value;
    const shouldRestrictRoute = loggedInEmail.user_role === 'Executive';
    const isFirstLogin = loggedInEmail.first_login
    console.log(isFirstLogin)
    return (
        <AuthProvider
            authType="cookie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            refresh={refreshApi}>
            <Router>

                {!isFirstLogin ? <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/on-board" element={<OnBoardForm />} />
                    <Route path="/change-password" element={<ChangePasswordPage />} />
                    <Route path="/dashboard" element={<NewDashBoard />} />
                    <Route path="/user-attendance" element={<UserPage />} />
                    <Route path="/user-self" element={<UserSelfPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/user-leaves" element={<UserLeavesPage />} />
                    <Route path='/leave-approvals' element={<LeaveApprovalPage />} />
                    <Route path='/attendance-reg' element={<UserAttendanceRegPage />} />
                    <Route path='/attendance-approvals' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <UserAttendanceRequestApprove />} />
                    <Route path='/add-user' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <AddUserPage />} />
                    <Route path='/resignation' element={<UserResignation />} />
                    <Route path='/resignation-approvals' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <ResignationApprovals />} />
                    <Route path='/it-ticket' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <RaiseTicket />} />
                    <Route path='/attendance-all' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <AllAttendanceDetails />} />
                    <Route path='about-org' element={<OrganizationDetails />} />
                    <Route path="/hrpolicy" element={<HrPolicyPage />} />
                    <Route path='/user-edit' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <EditUserPage />} />
                    <Route path='/reports' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <ProductionReportsPage />} />
                    <Route path='/user-logs' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <UserDailyLogs />} />
                    <Route path='/advance' element={shouldRestrictRoute ? <Navigate to="/advance" /> : <AdvanceRequestPage />} />
                    <Route path='/offer-initiation' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <OnBoardRequest />} />
                    <Route path='/team-attendance' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <TeamAttendance />} />
                </Routes> : <Routes>

                    <Route path="/" element={<LoginPage />} />
                    <Route path="/on-board" element={<OnBoardForm />} />
                    <Route path="/change-password" element={<ChangePasswordPage />} />
                    <Route
                        path="*"
                        element={
                                <Navigate to="/change-password" />
                            
                        }
                    />
                </Routes>
                }
            </Router>
        </AuthProvider>

    )
}

export default AppRoutes;
