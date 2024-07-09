import { Provider } from "react-redux"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { store } from "../store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"

import '../src/assets/style/main.css'
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path={"/toy/edit"} />
              <Route element={<ToyEdit />} path={"/toy/edit/:toyId"} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}

