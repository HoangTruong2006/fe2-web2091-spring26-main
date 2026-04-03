import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRUDStory, Story } from '../hook/useCRUDStory';

const StoryManager: React.FC = () => {
  const navigate = useNavigate();
  const { list, update, remove } = useCRUDStory();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<Partial<Story>>({});

  const handleGoToAdd = () => {
    navigate('/lab4'); 
  };

  const startEdit = (story: Story) => {
    setEditingId(story.id);
    setTempData({ title: story.title, author: story.author });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempData({});
  };

  
  const handleSave = (id: number) => {
    update.mutate(
      { id, data: tempData },
      {
        onSuccess: () => setEditingId(null), 
      }
    );
  };

  if (list.isLoading) return (
    <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
      Đang tải dữ liệu truyện...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10 border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Quản Lý Thư Viện</h2>
        </div>
        <button 
          onClick={handleGoToAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
        >
          <span>+</span> Thêm truyện mới
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase">Tên truyện</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase">Tác giả</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600 uppercase text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.data?.map((story: Story) => (
              <tr key={story.id} className={`hover:bg-slate-50/50 transition-colors ${editingId === story.id ? 'bg-indigo-50/30' : ''}`}>
                <td className="px-6 py-4">
                  {editingId === story.id ? (
                    <input 
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={tempData.title || ''}
                      onChange={(e) => setTempData({...tempData, title: e.target.value})}
                    />
                  ) : (
                    <span className="font-medium text-slate-700">{story.title}</span>
                  )}
                </td>

                {/* CỘT TÁC GIẢ */}
                <td className="px-6 py-4 text-slate-600">
                  {editingId === story.id ? (
                    <input 
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                      value={tempData.author || ''}
                      onChange={(e) => setTempData({...tempData, author: e.target.value})}
                    />
                  ) : (
                    story.author || 'Chưa cập nhật'
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  {editingId === story.id ? (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleSave(story.id)}
                        disabled={update.isPending}
                        className="text-green-600 hover:bg-green-50 px-3 py-1 rounded font-bold"
                      >
                        {update.isPending ? '...' : 'Lưu'}
                      </button>
                      <button onClick={cancelEdit} className="text-slate-400 hover:bg-slate-100 px-3 py-1 rounded">
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => startEdit(story)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm underline-offset-4 hover:underline"
                      >
                        Chỉnh sửa
                      </button>
                      <button 
                        onClick={() => { if(window.confirm("Xóa bản ghi này?")) remove.mutate(story.id) }}
                        className="text-red-500 hover:text-red-700 font-medium text-sm opacity-80 hover:opacity-100"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {list.data?.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          Chưa có dữ liệu nào trong thư viện.
        </div>
      )}
    </div>
  );
};

export default StoryManager;