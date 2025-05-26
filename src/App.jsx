import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'

import Deals from './pages/Deals'

import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/leaderboard" element={<Leaderboard />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!text-sm"
        toastClassName="!rounded-xl !shadow-soft"
      />
    </>
  )
}

export default App