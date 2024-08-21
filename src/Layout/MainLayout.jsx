import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='bg-dark-custom'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout