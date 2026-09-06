import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';
import { SocketProvider } from './context/SocketContext';
import './styles/global.css'; // Explicitly importing global styles

function App() {
  return (
    <SocketProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </SocketProvider>
  );
}

export default App;