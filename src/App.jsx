import { useState } from 'react'
import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import BluryLineBottom from './Components/OthersComponents/BluryLineBottom/BluryLineBottom'
import Loader from './Components/Loader/Loader'
import ProvideApp from './Components/OthersComponents/ProvideApp/ProvideApp'
import NavigationBar from './Components/ NavigationBar/NavigationBar'
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes'
import  Flowbtn from './Components/FlowBtn/Flowbtn'

function AppContent() {
  const location = useLocation();
  const validRoutes = ['/', '/about', '/our-clients', '/modules'];
  const isNotFoundPage = !validRoutes.includes(location.pathname);

  return (
    <>
      {!isNotFoundPage && <NavigationBar />}
      <AnimatedRoutes />
      {!isNotFoundPage && <ProvideApp />}
      {!isNotFoundPage && <Footer />}
      {!isNotFoundPage && <BluryLineBottom />}
      <Flowbtn />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  )
}

export default App
