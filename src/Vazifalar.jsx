import { useState, useEffect } from "react";
import { todosAPI } from "./api";

function Vazifalar() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await todosAPI.getAll();
      if (res.success) {
        setTodos(res.data);
      }
    } catch {
      setError("Vazifalarni yuklashda xatolik. Backend (port 5000) ishlab turganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    todosAPI.getAll().then((res) => {
      if (res.success) setTodos(res.data);
      setLoading(false);
    }).catch(() => {
      setError("Vazifalarni yuklashda xatolik");
      setLoading(false);
    });
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setSaving(true);
      const res = await todosAPI.create({
        title,
        description,
        isCompleted,
      });

      if (res.success) {
        setTitle("");
        setDescription("");
        setIsCompleted(false);
        fetchTodos();
      } else {
        setError(res.message);
      }
    } catch {
      setError("Todo qo'shishda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (todo) => {
    try {
      await todosAPI.update(todo._id, { isCompleted: !todo.isCompleted });
      setTodos(
        todos.map((t) => (t._id === todo._id ? { ...t, isCompleted: !t.isCompleted } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todosAPI.delete(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mening vazifalarim (To-Do)</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            MongoDB Atlas bazasi bilan sinxronlashgan dars vazifalari
          </p>
        </div>
        <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-3 py-1.5 rounded-full">
          Jami: {todos.length} ta
        </span>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-base font-bold text-gray-800 mb-4">
          + Yangi vazifa qo'shish
        </h2>

        <form onSubmit={handleAddTodo} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Sarlavha (title) *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: React 4-oy amaliy topshiriqni tugatish"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Tavsif (description)
            </label>
            <textarea
              rows="2"
              placeholder="Vazifa haqida batafsil ma'lumot..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-400"
              />
              <span>Bajarilgan (isCompleted)</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="bg-[#F5A623] hover:bg-[#E89510] text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {saving ? "Qo'shilmoqda..." : "Vazifani saqlash"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Vazifalar ro'yxati</h2>
          {loading && <span className="text-xs text-gray-400">Yuklanmoqda...</span>}
        </div>

        {todos.length === 0 && !loading ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            Hozircha vazifalar yo'q. Yuqoridagi formadan yangi vazifa qo'shishingiz mumkin.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="p-4 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggle(todo)}
                    className="w-4 h-4 mt-1 text-amber-500 rounded border-gray-300 cursor-pointer"
                  />
                  <div>
                    <h3
                      className={`text-sm font-semibold text-gray-800 ${
                        todo.isCompleted ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    {todo.description && (
                      <p className="text-xs text-gray-500 mt-1">{todo.description}</p>
                    )}
                    <span className="text-[10px] text-gray-400 mt-1.5 inline-block">
                      {new Date(todo.createdAt).toLocaleString("uz-UZ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      todo.isCompleted
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {todo.isCompleted ? "Bajarildi" : "Jarayonda"}
                  </span>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                    title="O'chirish"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Vazifalar;
