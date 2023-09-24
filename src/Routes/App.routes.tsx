import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import UserPage from "../components/user/UserPage";
import LoginPage from "../components/LoginPage";
import { AuthProvider } from "react-auth-kit";
import refreshApi from "../QueryApiCalls/refreshApi";
import UserSelfPage from "../components/user/UserSelfPage";
import EventsPage from "../components/Events/Events.page";
import UserLeavesPage from "../components/user/UserLeavesPage";

function AppRoutes() {
    return (
        <AuthProvider
            authType="cookie"
            authName="_auth"
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === "https:"}
            refresh={refreshApi}>
            <Router>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/admin" element={<HomePage />} />
                    <Route path="/user-attendance" element={<UserPage />} />
                    <Route path="/user-self" element={<UserSelfPage/>}/>
                    <Route path="/events" element={<EventsPage/>}/>
                    <Route path="/user-leaves" element={<UserLeavesPage/>}/>
                </Routes>
            </Router>
        </AuthProvider>

    )
}

export default AppRoutes;