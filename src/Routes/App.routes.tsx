import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import UserPage from "../components/user/UserPage";
import LoginPage from "../components/LoginPage";
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
// import LoginPage from "../components/Login/LoginPage";

function AppRoutes() {
    const loggedInEmail = UserInfoStore()?.loggedUserInfo.value;
    const shouldRestrictRoute = loggedInEmail.user_role === 'Executive';
    return (
        <AuthProvider
            authType="cookie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            refresh={refreshApi}>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/change-password" element={<ChangePasswordPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
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
                    <Route path='/attendance-all' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <AllAttendanceDetails />} />
                    <Route path='about-org' element={<OrganizationDetails />} />
                    <Route path="/hrpolicy" element={<HrPolicyPage />} />
                    <Route path='/user-edit' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <EditUserPage />} />
                    <Route path='/user-logs' element={shouldRestrictRoute ? <Navigate to="/dashboard" /> : <UserDailyLogs />} />
                </Routes>
            </Router>
        </AuthProvider>

    )
}

export default AppRoutes;