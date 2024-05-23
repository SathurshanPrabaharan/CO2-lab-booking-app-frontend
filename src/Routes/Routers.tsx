

import {Routes, Route} from 'react-router-dom'

import Login from '../Pages/Login'
import InventoryPage from '../Pages/InventoryPage'
import Home from '../Pages/Home'
import Register from '../Pages/Register'

const Routers = () => {
  return (
    <>
      <Routes>
          { <Route path='/' element={<Home/>}/> }
          <Route path='/login' element={<Login/>}/>
          { <Route path='Inventory_page' element={<InventoryPage/>}/> }
          <Route path='/Inventory_page' element={<InventoryPage/>}/>
          { <Route path='Register' element={<Register/>}/> }
          {/* <Route path='/Register' element={<Register/>}/> */}
      </Routes>
    </>
  )
}

export default Routers
