import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter