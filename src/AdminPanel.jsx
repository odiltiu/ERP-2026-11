import { useState, useEffect } from "react";
import { usersAPI, postsAPI } from "./api";

const adminStats = [
  { label: "Jami talabalar", value: "1,248", change: "+12%", up: true },
  { label: "Faol kurslar", value: "48", change: "+3", up: true },
  { label: "Bu oy daromad", value: "$24,800", change: "+8%", up: true },
  { label: "Chiqib ketganlar", value: "32", change: "+5%", up: false },
];

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [userSaving, setUserSaving] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    author: "Admin",
  });
  const [postSaving, setPostSaving] = useState(false);
  const [postMessage, setPostMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await usersAPI.getAll();
      if (res.success) {
        setUsers(res.data);
      }
    } catch {
      console.error("Users load error");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await postsAPI.getAll();
      if (res.success) {
        setPosts(res.data);
      }
    } catch {
      console.error("Posts load error");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    usersAPI.getAll().then((res) => {
      if (res.success) setUsers(res.data);
      setLoadingUsers(false);
    }).catch(() => setLoadingUsers(false));

    postsAPI.getAll().then((res) => {
      if (res.success) setPosts(res.data);
      setLoadingPosts(false);
    }).catch(() => setLoadingPosts(false));
  }, []);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setUserSaving(true);
    setUserMessage("");
    try {
      const res = await usersAPI.create(userForm);
      if (res.success) {
        setUserMessage("Foydalanuvchi muvaffaqiyatli saqlandi!");
        setUserForm({ firstname: "", lastname: "", email: "", phone: "" });
        fetchUsers();
        setTimeout(() => {
          setShowUserModal(false);
          setUserMessage("");
        }, 1000);
      } else {
        setUserMessage(res.message);
      }
    } catch {
      setUserMessage("Xatolik yuz berdi");
    } finally {
      setUserSaving(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostSaving(true);
    setPostMessage("");
    try {
      const res = await postsAPI.create(postForm);
      if (res.success) {
        setPostMessage("Post muvaffaqiyatli saqlandi!");
        setPostForm({ title: "", content: "", author: "Admin" });
        fetchPosts();
        setTimeout(() => {
          setShowPostModal(false);
          setPostMessage("");
        }, 1000);
      } else {
        setPostMessage(res.message);
      }
    } catch {
      setPostMessage("Xatolik yuz berdi");
    } finally {
      setPostSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin boshqaruvi</h1>
          <p className="text-sm text-gray-500 mt-1">Platforma statistikasi va MongoDB ma'lumotlar bazasi</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUserModal(true)}
            className="bg-[#F5A623] hover:bg-[#E89510] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs"
          >
            + Talaba qo'shish
          </button>
          <button
            onClick={() => setShowPostModal(true)}
            className="border border-[#F5A623] text-[#F5A623] hover:bg-amber-50 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            + Yangi post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <p className="text-gray-500 text-xs mb-1.5">{s.label}</p>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <span
              className={`text-xs font-semibold mt-1 inline-block ${
                s.up ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {s.up ? "↑" : "↓"} {s.change}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-gray-800">MongoDB Talabalari (Users)</h2>
            <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full">
              {users.length} ta
            </span>
          </div>
          <button
            onClick={() => setShowUserModal(true)}
            className="text-[#F5A623] text-sm font-semibold hover:underline cursor-pointer"
          >
            + Foydalanuvchi qo'shish
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-200 text-left">
                <th className="px-6 py-3.5 font-bold text-gray-700">Ism Familiya</th>
                <th className="px-6 py-3.5 font-bold text-gray-700">Email</th>
                <th className="px-6 py-3.5 font-bold text-gray-700 hidden md:table-cell">Telefon</th>
                <th className="px-6 py-3.5 font-bold text-gray-700">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loadingUsers ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                    MongoDB dan yuklanmoqda...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                    Hozircha foydalanuvchilar yo'q. "+ Talaba qo'shish" tugmasini bosing.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {u.firstname} {u.lastname}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{u.phone}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-700">
                        {u.role || "student"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-gray-800">Postlar va Yangiliklar (Posts)</h2>
            <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full">
              {posts.length} ta
            </span>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="text-[#F5A623] text-sm font-semibold hover:underline cursor-pointer"
          >
            + Yangi post yaratish
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {loadingPosts ? (
            <p className="text-gray-400 text-sm col-span-2">Postlar yuklanmoqda...</p>
          ) : posts.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm col-span-2">
              Hozircha postlar mavjud emas. "+ Yangi post" orqali qo'shing.
            </div>
          ) : (
            posts.map((p) => (
              <div key={p._id} className="bg-gray-50/70 border border-gray-200 rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-800">{p.title}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{p.content}</p>
                <div className="text-xs text-gray-500 pt-2 flex items-center justify-between border-t border-gray-200">
                  <span>Muallif: {p.author}</span>
                  <span className="bg-white border border-gray-200 px-2.5 py-0.5 rounded text-[11px] font-medium text-gray-600">
                    {p.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showUserModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md p-6 text-gray-800 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold">Yangi talaba qo'shish (User)</h2>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {userMessage && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-medium">
                {userMessage}
              </div>
            )}

            <form onSubmit={handleUserSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Ism (firstname) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ali"
                  value={userForm.firstname}
                  onChange={(e) => setUserForm({ ...userForm, firstname: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Familiya (lastname) *</label>
                <input
                  type="text"
                  required
                  placeholder="Valiyev"
                  value={userForm.lastname}
                  onChange={(e) => setUserForm({ ...userForm, lastname: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="ali@gmail.com"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Telefon raqam (phone) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998901234567"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={userSaving}
                  className="bg-[#F5A623] hover:bg-[#E89510] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {userSaving ? "Saqlanmoqda..." : "MongoDB ga saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-md p-6 text-gray-800 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold">Yangi post yaratish (Post)</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {postMessage && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-medium">
                {postMessage}
              </div>
            )}

            <form onSubmit={handlePostSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Post sarlavhasi (title) *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Full Stack kursi boshlanmoqda"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Post matni (content) *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Post haqida batafsil ma'lumot yozing..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={postSaving}
                  className="bg-[#F5A623] hover:bg-[#E89510] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {postSaving ? "Saqlanmoqda..." : "MongoDB ga saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
