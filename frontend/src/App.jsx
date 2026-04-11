import './App.css'
import Navbar from './components/layout/Navbar';
import AppRouter from './routes/AppRouter';
import Footer from './components/layout/Footer';
import Featured from './components/layout/Featured';
import Stats from './components/stats/Stats';
export default function App() {
  return (
    <div className="min-h-screen bg-color: #FAFAFA;">
      <Navbar />
      <AppRouter />
      <Featured />
      <Stats/>
       <Footer />
    </div>
  );
}

