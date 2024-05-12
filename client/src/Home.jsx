
import Hero from"./components/Hero"
import Homemenu from"./components/Homemenu"
import About from"./components/About"
import Contact from"./components/Contact"
import Visitus from "./components/Visitus"

const Home = () => {
  // useEffect(()=>{
  //   axios.get('/profile').then(e=>console.log(e))
  // },[])
  return (
    <div className=" p-4  ">
    <Hero/>
    <Homemenu/>
    <About/>
    <Visitus/>
   </div>
  )
}

export default Home
