import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import FooterPage from '../Pages/FooterPage'

const MainLayout = () => {
  return (
    <div className='bg-dark-custom'>
        <NavBar/>
        <main>
           <Outlet/>
        </main>
       <FooterPage/>
    </div>
  )
}

export default MainLayout