import './App.css'
import Navbar from './components/layout/Navbar';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <div className="min-h-screen bg-color: #FAFAFA;">
      <Navbar />
      
      <AppRouter /> 
      
      <div className="h-[200vh]"></div>
    </div>
  );
}

