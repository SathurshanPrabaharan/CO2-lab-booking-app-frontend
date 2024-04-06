

import {Routes, Route} from 'react-router-dom'

import Login from '../Pages/Login'
import Home from '../Pages/Home'

const Routers = () => {
  return (
    <>
      <Routes>
          {/* <Route path='/' element={<Home/>}/> */}
          <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default Routers
