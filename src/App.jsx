import Header from './components/Header';
import MainPage from './pages/MainPage';
import { Route, Routes } from 'react-router-dom';
import NotePage from './pages/NotePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import InputPage from './pages/InputPage';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import Protect from './components/Protect';
import PublicRoute from './components/PublicRoute';

function App() {
  const { theme } = useContext(ThemeContext)
  
  return (
    <div className="app-container" data-theme={theme}>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<PublicRoute><LoginForm /></PublicRoute>
            
            } />
          <Route path='/register' element={<PublicRoute><RegisterForm /></PublicRoute>
            
            } />
          
          <Route path="/home" element={ 
            <Protect>
              <MainPage type={'active'}/>
            </Protect>
            } />
          <Route path="/archives" element={
            <Protect>
              <MainPage type={'archived'}/>
            </Protect>
            } />
          <Route path="/notes/new" element={
            <Protect>
              <InputPage />
            </Protect>
            } />
          <Route path="/notes/:name" element={
            <Protect>
              <NotePage />
            </Protect>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
