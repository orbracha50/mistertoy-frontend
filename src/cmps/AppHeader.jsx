import { useSelector } from "react-redux"

import { NavLink, useNavigate } from "react-router-dom"
import { LoginSignup } from "../pages/Login.jsx"
import { logout } from "../../store/actions/user.action.js"
import { UserMsg } from "./userMsg.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
            navigate('/')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }
    console.log(user)
    return (
        <section className="header-container full ">
            <h1>Toy App</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/toy/dashboard" >Dashboard</NavLink>
                <NavLink to="/review">Review</NavLink>
                {!user && <NavLink to="/login" >Login</NavLink>}
            </nav>
            {user && (
                <section className="user-info">
                    {<p>
                        {user.fullname} 
                    </p>}
                    <button onClick={onLogout}>Logout</button>
                </section>
            )}
            <UserMsg />
        </section>
    )
}