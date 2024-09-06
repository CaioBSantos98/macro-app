import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DefaultPage from './pages/DefaultPage';
import Home from './pages/Home';
import Meals from './pages/Meals';
import NewFood from './pages/NewFood';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Foods from './pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<DefaultPage />}>
              <Route path='/meals' element={<Meals />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/foods' element={<Foods />} />
              <Route path='/foods/create' element={<NewFood />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
