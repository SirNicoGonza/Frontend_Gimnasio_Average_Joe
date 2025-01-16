import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/ui/Footer";

export default function Layout(){
    return (
        <AuthProvider>
            <NavBar appName={"Average Joe"} />
            <div>
                <Outlet />
            </div>
            <Footer />
        </AuthProvider>
    )
};