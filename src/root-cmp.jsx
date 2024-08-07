import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { store } from "../store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"

import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { DashBoard } from "./pages/DashBoard.jsx"
import { About } from "./pages/About.jsx"
import { LoginSignup } from "./pages/Login.jsx"
import { ReviewIndex } from "./pages/ReviewIndex.jsx"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <AppHeader />
          <main >
            <Routes>
              <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path={"/toy/edit"} />
              <Route element={<ToyEdit />} path={"/toy/edit/:toyId"} />
              <Route element={<DashBoard />} path={"/toy/dashboard"} />
              <Route element={<LoginSignup />} path="/login" />
              <Route path="review" element={<ReviewIndex />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

