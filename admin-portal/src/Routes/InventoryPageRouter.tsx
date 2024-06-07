import { Route, Routes } from 'react-router-dom'
import InventoryPage from '../Pages/InventoryPage'

const InventoryPageRouter = () => {
  return (
    <>
      <Routes>
          <Route path='/InventoryPage' element={<InventoryPage/>}/>
      </Routes>
    </>
  )
}

export default InventoryPageRouter
