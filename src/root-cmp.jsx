import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { store } from "../store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"

import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { DashBoard } from "./pages/DashBoard.jsx"
import { About } from "./pages/About.jsx"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section>
          <AppHeader />
          <main>
            <Routes>
            <Route element={<About />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path={"/toy/edit"} />
              <Route element={<ToyEdit />} path={"/toy/edit/:toyId"} />
              <Route element={<DashBoard/>} path={"/toy/dashboard"}/>
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

