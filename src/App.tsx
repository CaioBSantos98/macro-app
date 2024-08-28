import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DefaultPage from './pages/DefaultPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Meals from './pages/Meals';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import NewFood from './pages/NewFood';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
          <Routes>
            <Route path='/' element={<DefaultPage />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='meals' element={<Meals />} />
              <Route path='profile' element={<Profile />} />
              <Route path='new-food' element={<NewFood />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
