import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import AddPage from './pages/Register';

function App() {
  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB2091 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">Trang chủ</Link>
            <Link to="/list" className="hover:text-gray-200">Danh sách</Link>
            <Link to="/add" className="hover:text-gray-200">Thêm mới</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
            <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<div className="text-center mt-10">Trang thêm mới</div>} />
        <Route path="/login" element={<div className="text-center mt-10">Trang đăng nhập</div>} />
        <Route path="/register" element={<AddPage />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;