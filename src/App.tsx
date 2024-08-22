import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import Login from './pages/Login';
import Meals from './pages/Meals';
import NotFound from './pages/NotFound';
import DefaultPage from './pages/DefaultPage';

function App() {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <MantineProvider>
          <Routes>
            <Route path='/' element={<DefaultPage />}>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='meals' element={<Meals />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </MantineProvider>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
