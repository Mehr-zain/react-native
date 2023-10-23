
import './Navbar.css';
import{Routes,Route,Navigate} from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";


import Home from './Home';
// import About from './About';
// import Service from './Service';
// import Contact from './Contact';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword'
import EmailVerification from './EmailVerification';
import AdditionalInformation from './AdditionalInformation';
// import Footer from './Footer';
// import Login from './Login';
// import Signup from './Signup';


function App() {
  return (
<>
  <Navbar/> 
  
   <Routes>
    <Route exact path='/' element={<LandingPage/>}/>
    {/* <Route exact path='/About' element={<About/>}/>
    <Route exact path='/Service' element={<Service/>}/>
    <Route exact path='/Contact' element={<Contact/>}/> */}
    <Route exact path='/Home' element={<Home/>}/>
    <Route exact path='/SignUp' element={<SignUp/>}/>
    <Route exact path='/EmailVerification' element={<EmailVerification/>}/>
    <Route exact path='/AdditionalInformation' element={<AdditionalInformation/>}/>
    <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
    <Route exact path='/SignIn' element={<SignIn/>}/>
 
    <Route  element={<Navigate to="/"/>}/>
   </Routes>
   {/* <Footer/> */}
</>
  );
}

export default App;
