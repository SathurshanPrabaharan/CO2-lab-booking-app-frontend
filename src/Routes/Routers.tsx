

import {Routes, Route} from 'react-router-dom'

import Login from '../Pages/Login'
import InventoryPage from '../Pages/InventoryPage'
import Home from '../Pages/Home'

const Routers = () => {
  return (
    <>
      <Routes>
          { <Route path='/' element={<Home/>}/> }
          <Route path='/login' element={<Login/>}/>
          { <Route path='InventoryPage' element={<InventoryPage/>}/> }
          <Route path='/InventoryPage' element={<InventoryPage/>}/>
      </Routes>
    </>
  )
}

export default Routers
