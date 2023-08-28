import Home from './components/views/Home';
import './App.css'
// import Sidebar from './components/layouts/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  // const hasIdParam = window.location.pathname !== '/' && window.location.pathname !== '';
  // if (hasIdParam) {
  //   // Redirect to the main page if there's an 'id' in the URL
  //   window.location.href = '/';
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes >
          <Route path='/' element={<Home/>} />
          <Route path='/:id' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      {/* <Sidebar/> */}
    </div>

  );
}

export default App;