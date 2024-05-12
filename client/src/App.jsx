import {Routes , Route} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Addpage from './pages/Addpage'
import { Usercontextprovider } from './usercontext'
import Addburger from './pages/Addburger'
import Menupage from './pages/Menupage'
import Cartpage from './pages/Cartpage'
axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true;

const App = () => {
  return (
<Usercontextprovider>
<Routes>
    <Route path='/' element={<Layout/>}>
    <Route index element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/addpizza' element={<Addpage/>}/>
    <Route path='/addburger' element={<Addburger/>}/>
    <Route path='/menu' element={<Menupage/>}/>
    <Route path='/cart' element={<Cartpage/>}/>
      
    </Route>
    </Routes>
</Usercontextprovider>

  )
}
export default App
