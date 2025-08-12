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
// import CreateOwnPortal from './Components/CreateOwnPortal/CreateOwnPortal'
import PoliciesData from './Components/OthersComponents/Policies/PoliciesData'

function AppContent() {
  const location = useLocation();

  // Check if the current path matches any of our valid route patterns
  const isValidRoute = () => {
    const path = location.pathname;

    // Exact matches
    const exactRoutes = ['/', '/about', '/our-clients', '/modules','/creating-portal', '/services','/reset' ];
    if (exactRoutes.includes(path)) return true;

    // Policy routes - check if the path matches any policy name
    if (path.startsWith('/') && path.length > 1) {
      const policyName = path.substring(1); // Remove the leading slash
      if (PoliciesData[policyName]) {
        return true;
      }
    }

    // Industry routes
    if (path.startsWith('/industry/')) return true;

    // Module routes
    if (path.startsWith('/module/')) return true;

    return false;
  };

  // Check if current route should hide header and footer
  const shouldHideCommonComponents = () => {
    const path = location.pathname;
    return path === '/login' || path === '/creating-portal';
  };

  const isNotFoundPage = !isValidRoute();
  const hideComponents = shouldHideCommonComponents();

  return (
    <>
      {!isNotFoundPage && !hideComponents && <NavigationBar />}
      <AnimatedRoutes />
      {/* {!isNotFoundPage && !hideComponents && <ProvideApp />} */}
      {!isNotFoundPage && !hideComponents && <Footer />}
      {!isNotFoundPage && !hideComponents && <BluryLineBottom />}
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
