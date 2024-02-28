import { Outlet } from "react-router-dom";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import BackToTopButton from "../BackToTop";
import Navbar from "../NavBar";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { checkAuth } from "../../store/reducers/user";


function App() {
   const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
    <>
        <Header />
        <Navbar />
        <Outlet />
        <BackToTopButton />
        <Footer />
    </>)
    }
  
  export default App;
  