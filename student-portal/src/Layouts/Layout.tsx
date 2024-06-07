
import Header from '../Components/Header/Header'
import Routers from '../Routes/Routers'
import Footer from '../Components/Footer/Footer'

const Layout = () => {
  return (
    <>
        
        <Header/>
            <main className='block'>
                <Routers/>
            </main>
        <Footer/>
      
    </>
  )
}

export default Layout
