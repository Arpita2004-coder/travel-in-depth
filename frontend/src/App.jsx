import './App.css'
import Navbar from './components/layout/Navbar';
import AppRouter from './routes/AppRouter';
import Footer from './components/layout/Footer';
import Featured from './components/layout/Featured';
import Stats from './components/stats/Stats';
import { CityProvider } from './context/CityContext';
import { AuthProvider } from './features/auth/AuthContext';
// ...keep your other imports

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-montserrat">
      <AuthProvider>
        <CityProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </CityProvider>
      </AuthProvider>
    </div>
  );
}

