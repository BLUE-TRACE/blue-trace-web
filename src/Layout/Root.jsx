import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;