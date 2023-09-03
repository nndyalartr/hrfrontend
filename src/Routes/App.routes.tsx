import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Dashboard from "../components/Dashboard";
import UserPage from "../components/UserPage";

function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/admin" element={<HomePage/>}/>
                <Route path="/user" element={<UserPage/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes;