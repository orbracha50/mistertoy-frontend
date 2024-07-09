

import { NavLink } from "react-router-dom"

export function AppHeader() {
    return (
        <header className="app-header">
            <section className="header-container">
                <h1>Toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Cars</NavLink>
                </nav>
            </section>
            {/* <UserMsg /> */}
        </header>
    )
}