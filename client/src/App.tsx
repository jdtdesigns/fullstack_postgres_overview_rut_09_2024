import {Routes, Route} from 'react-router-dom';
// import { useState } from 'react'

import Header from './components/Header';

import Landing from './pages/Landing';
import Shops from './pages/Shops';
import ShopForm from './pages/ShopForm';
import WineForm from './pages/WineForm';
import AuthForm from './pages/AuthForm';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/shops/create" element={<ShopForm />} />
        <Route path="/wines/add" element={<WineForm />} />
        <Route path="/register" element={<AuthForm isLogin={false} />} />
        <Route path="/login" element={<AuthForm isLogin={true} />} />
      </Routes>
    </>
  )
}

export default App
