import { useState } from 'react'
import './App.css'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import BluryLineBottom from './Components/OthersComponents/BluryLineBottom/BluryLineBottom'
import Loader from './Components/Loader/Loader'
import ProvideApp from './Components/OthersComponents/ProvideApp/ProvideApp'
import NavigationBar from './Components/ NavigationBar/NavigationBar'
import AnimatedRoutes from './Components/AnimatedRoutes/AnimatedRoutes'
import Flowbtn from './Components/FlowBtn/Flowbtn'
import CreateOwnPortal from './Components/CreateOwnPortal/CreateOwnPortal'
function AppContent() {
  const location = useLocation();

  // Check if the current path matches any of our valid route patterns
  const isValidRoute = () => {
    const path = location.pathname;

    // Exact matches
    const exactRoutes = ['/', '/about', '/our-clients', '/modules', '/services', '/create-own-portal', '/reset' ];
    if (exactRoutes.includes(path)) return true;

    // Policy routes
    if (path.startsWith('/policies/')) return true;

    // Industry routes
    if (path.startsWith('/industry/')) return true;

    // Module routes
    if (path.startsWith('/module/')) return true;

    return false;
  };

  const isNotFoundPage = !isValidRoute();

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
