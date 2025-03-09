import { Outlet } from 'react-router-dom';
import './styles/app.css';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='app-container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
