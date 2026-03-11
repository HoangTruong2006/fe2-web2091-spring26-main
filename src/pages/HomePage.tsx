import { useState } from 'react';

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', age: 20, major: 'Công nghệ thông tin' },
  { id: 2, name: 'Trần Thị Bích', age: 21, major: 'Kinh tế' },
  { id: 3, name: 'Lê Hoàng Cường', age: 22, major: 'Điện tử viễn thông' },
  { id: 4, name: 'Phạm Minh Dũng', age: 19, major: 'Quản trị kinh doanh' },
  { id: 5, name: 'Hoàng Kim Ngân', age: 20, major: 'Ngôn ngữ Anh' },
];

function HomePage() {
  const [students] = useState(initialStudents);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Chào mừng đến với WEB2091</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 border-b">Danh sách sinh viên</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tuổi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chuyên ngành
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.major}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;