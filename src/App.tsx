import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import Bai3 from './pages/bai3';
import { Lab4 } from './pages/lab4';
import Lab5 from './pages/lab5';
import Lab7 from './pages/lab7';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuthStore } from './stores/useAuthStore';
import StoryManager from './pages/storyManeger';

function App() {
  const { user, logout } = useAuthStore();

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
            <Link to="/bai3" className="hover:text-gray-200">Bài 3</Link>
            <Link to="/lab4" className="hover:text-gray-200">Lab 4</Link>
            <Link to="/lab5" className="hover:text-gray-200">Lab 5</Link>
            <Link to="/lab7" className="hover:text-gray-200">Lab 7</Link>
            <Link to="/StoryManager" className="hover:text-gray-200">Quản lý truyện</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <p className="font-medium">{user.email}</p>
                    <p className="text-blue-100 text-xs">Đã đăng nhập</p>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-blue-100">Chưa đăng nhập</p>
                <Link to="/login" className="hover:text-gray-200">Đăng nhập</Link>
                <Link to="/register" className="hover:text-gray-200">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<div className="text-center mt-10">Trang thêm mới</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bai3" element={<Bai3 />} />
        <Route path="/lab4" element={<Lab4 />} />
        <Route path="/lab5" element={<Lab5 />} />
        <Route path="/lab7" element={<Lab7 />} />
        <Route path="/StoryManager" element={<StoryManager />} />
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;