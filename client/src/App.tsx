import {Routes, Route} from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';

import Landing from './pages/Landing';
import UserShops from './pages/UserShops';
import ShopForm from './pages/ShopForm';
import WineForm from './pages/WineForm';
import AuthForm from './pages/AuthForm';
import NotFound from './pages/NotFound';

function App() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }
  
  const { state } = store;

  return (
    <>
      {state.loading && (
        <>
          <div className="loading d-flex justify-content-center align-items-center">
            <h2>Pouring ...</h2>
          </div>
        </>
      )}

      <Header />

      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Landing />} />

          {state.user ? (
            <>
              <Route path="/shops" element={<UserShops />} />
              <Route path="/shops/create" element={<ShopForm />} />
              <Route path="/wines/add" element={<WineForm />} />              
            </>
          ) : (
            <>
              <Route path="/register" element={<AuthForm isLogin={false} />} />
              <Route path="/login" element={<AuthForm isLogin={true} />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
