import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { Route, Routes } from 'react-router';
import Darkmode from './utils/DarkMode';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';
import ProfileScreen from './Pages/ProfileScreen';
import Dashboard from './Pages/Dashboard';
import SingleProject from './Pages/SingleProject';
import Cart from './Pages/Cart';
import CheckoutScreen from './Pages/CheckoutScreen';
import { yellow } from '@mui/material/colors';
// import SingleProject from './Pages/SingleProject';
function App() {

  return (
    <>
     <div>
      <Darkmode>
      <Navbar/>
      <main id='body'>
      <Container maxWidth="xl">
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path={'/profile'} element={<ProfileScreen/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path={'/project/:_id'} element={<SingleProject/>}/>
        <Route path={'/cart'} element={<Cart/>}/>
        <Route path={'/checkout'} element={<CheckoutScreen/>}/>
          {/* 
          <Route path='/admin'>
            <Route path='users' element={<UserPanel/>}/>
            <Route path='orders' element={<OrderPanel/>}/>
          </Route> */}
        </Routes>
     </Container>
      </main>
      {/* <footer style={{width: '100%',height:'40px',display:'flex',justifyContent:'center',alignItems:'center',bottom:0,position:'fixed', backgroundColor: 'black', color: 'white'}}>
        <span>Copyright &copy; 2022</span>
      </footer> */}
      </Darkmode>
    </div>
    </>
  )
}

export default App
