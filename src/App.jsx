import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Home from "./routes/Site Routes/Home";
import Features from "./routes/Site Routes/Features";
import Contact from "./routes/Site Routes/Contact";
import AppLayout from "./components/AppLayout";
import AuthContextProvider from "./context/AuthContext";
import Signin from "./routes/Site Routes/Signin";
import Signup from "./routes/Site Routes/Signup";
import Protected from "./routes/Site Routes/Protected";

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path='/features' element={<Features />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
            <Route
              path='/app'
              element={
                <Protected>
                  <AppLayout />
                </Protected>
              }
            />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
