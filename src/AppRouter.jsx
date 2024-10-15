import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Details from "./pages/details/Details";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import Auth from "./pages/auth/Auth.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";

const AppRouter = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/details/:id" element={<Details/>}/>
                        <Route path="/login" element={<Auth/>}/>
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </HashRouter>
    )
}

export default AppRouter