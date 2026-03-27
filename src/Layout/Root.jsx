import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-12 max-w-400">
                <Outlet />
            </div>
        </div>
    );
};

export default Root;