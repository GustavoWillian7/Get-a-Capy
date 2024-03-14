import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

// Components
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Message from './components/layout/Message'

// Pages
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import MyCapys from './components/pages/Capy/MyCapys'
import AddCapy from './components/pages/Capy/AddCapy'
import EditCapy from './components/pages/Capy/EditCapy'
import CapyDetails from './components/pages/Capy/CapyDetails'
import MyAdoptions from './components/pages/Capy/MyAdoptions'

// Context
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Routes>
            <Route path='/login' element={ <Login /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/user/profile' element={ <Profile /> } />
            <Route path='/capy/mycapys' element={ <MyCapys /> } />
            <Route path='/capy/add' element={ <AddCapy /> } />
            <Route path='/capy/edit/:id' element={ <EditCapy /> } />
            <Route path='/capy/myadoptions' element={ <MyAdoptions /> } />
            <Route path='/capy/:id' element={ <CapyDetails /> } />
            <Route path='/' element={ <Home /> } />
          </Routes>
        </Container>
        <Footer/>
      </UserProvider>
    </Router>
  )
}

export default App;