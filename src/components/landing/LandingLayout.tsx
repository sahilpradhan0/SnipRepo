import React from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-300">
            <Navbar
                onGetStarted={() => {
                    navigate('/login')
                }}
            />
            {children}
            <Footer />
        </div>
    );
};

export default LandingLayout;