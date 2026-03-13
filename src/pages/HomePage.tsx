import { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', age: 20, major: 'Công nghệ thông tin' },
  { id: 2, name: 'Trần Thị Bích', age: 21, major: 'Kinh tế' },
  { id: 3, name: 'Lê Hoàng Cường', age: 22, major: 'Điện tử viễn thông' },
  { id: 4, name: 'Phạm Minh Dũng', age: 19, major: 'Quản trị kinh doanh' },
  { id: 5, name: 'Hoàng Kim Ngân', age: 20, major: 'Ngôn ngữ Anh' },
];

const products = [
  { id: 1, name: 'Laptop Dell XPS 13', price: 15000000, category: 'Laptop' },
  { id: 2, name: 'Laptop HP Pavilion', price: 12000000, category: 'Laptop' },
  { id: 3, name: 'Laptop ASUS ZenBook', price: 13000000, category: 'Laptop' },
  { id: 4, name: 'Laptop Acer Nitro V', price: 15000000, category: 'Laptop' },
];

function HomePage() {
  const [students] = useState(initialStudents);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Chào mừng đến với WEB2091</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <h2 className="text-2xl font-semibold p-6 border-b">Danh sách sinh viên</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tuổi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chuyên ngành</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.major}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trang trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Trang sau
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 border-b">Danh sách sản phẩm</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price.toLocaleString()}đ</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;