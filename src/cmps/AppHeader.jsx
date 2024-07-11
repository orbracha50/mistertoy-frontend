

import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
            <section className="header-container full ">
                <h1>Toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/toy/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
    )
}