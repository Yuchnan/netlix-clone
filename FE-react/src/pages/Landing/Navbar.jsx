import DefaultButton from "@/components/modules/LandingPage/DefaultButton"
import OptionLanguage from "@/components/modules/LandingPage/OptionLanguage"

import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()
    return (
        <header className="relative z-20">
            <nav className="flex flex-wrap justify-between items-center pr-10 pl-6 py-4">
                <div>
                    <img src="/netflix-logo-icon.png" alt="netflix-logo" width={105} height={45} />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <OptionLanguage/>
                    <DefaultButton text={"Sign Up"} onClick={() => navigate("/register")} />
                </div>
            </nav>
        </header>
    )
}

export default Navbar
