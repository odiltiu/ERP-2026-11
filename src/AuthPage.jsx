import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "./api";

function AuthPage({ defaultMode = "login" }) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [showPassword, setShowPassword] = useState(false);

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const res = await authAPI.login({
          login: loginInput,
          email: loginInput,
          password,
        });

        if (!res.success) {
          setError(res.message || "Login yoki parol noto'g'ri");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setSuccess("Xush kelibsiz! Portalga o'tilmoqda...");
        setTimeout(() => {
          navigate("/portal");
        }, 600);
      } else {
        const res = await authAPI.register({
          firstname,
          lastname,
          email: loginInput,
          phone,
          password,
        });

        if (!res.success) {
          setError(res.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        setSuccess("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        setTimeout(() => {
          navigate("/portal");
        }, 600);
      }
    } catch {
      setError("Serverga ulanishda xatolik yuz berdi (backend port 5000 ishlamoqdami?)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      <div className="w-full md:w-1/2 bg-[#faf9f5] min-h-[340px] md:min-h-screen flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
        <div className="w-full max-w-md flex items-center justify-center">
          <svg
            viewBox="0 0 500 500"
            className="w-full max-w-[380px] h-auto drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            
            <ellipse cx="250" cy="430" rx="170" ry="25" fill="#e9e5db" opacity="0.6" />

            <g transform="translate(290, 80)">
              
              <circle cx="50" cy="50" r="38" fill="#a594f9" />
              <circle cx="50" cy="50" r="18" fill="#faf9f5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="43"
                  y="4"
                  width="14"
                  height="12"
                  rx="3"
                  fill="#8c78ec"
                  transform={`rotate(${deg} 50 50)`}
                />
              ))}
            </g>

            <g transform="translate(350, 140)">
              
              <circle cx="30" cy="30" r="26" fill="#c3b5fd" />
              <circle cx="30" cy="30" r="12" fill="#faf9f5" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <rect
                  key={deg}
                  x="25"
                  y="2"
                  width="10"
                  height="8"
                  rx="2"
                  fill="#a594f9"
                  transform={`rotate(${deg} 30 30)`}
                />
              ))}
            </g>

            <g transform="translate(160, 160) skewY(-8) rotate(-4)">
              
              <rect x="8" y="8" width="160" height="250" rx="22" fill="#d48208" />
              
              <rect x="0" y="0" width="160" height="250" rx="22" fill="#f5a623" />

              <circle cx="80" cy="65" r="30" fill="#ffffff" />
              
              <circle cx="80" cy="58" r="12" fill="#1e293b" />
              <path
                d="M62 82 C62 72, 70 69, 80 69 C90 69, 98 72, 98 82 Z"
                fill="#1e293b"
              />

              <rect x="30" y="115" width="100" height="12" rx="6" fill="#ffffff" />
              <rect x="30" y="137" width="100" height="12" rx="6" fill="#ffffff" />
              <rect x="30" y="159" width="100" height="12" rx="6" fill="#ffffff" />
              <rect x="30" y="181" width="70" height="12" rx="6" fill="#ffffff" />

              <rect x="45" y="212" width="70" height="18" rx="9" fill="#ffffff" />
            </g>

            <g transform="translate(70, 140) rotate(-6)">
              
              <rect x="0" y="0" width="130" height="34" rx="17" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
              
              <circle cx="17" cy="17" r="10" fill="#a594f9" />
              <path d="M13 17 L16 20 L21 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <text x="35" y="22" fill="#166534" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                login
              </text>
            </g>

            <g transform="translate(190, 175)">
              <circle cx="12" cy="12" r="11" fill="#f97316" />
              <path d="M8 8 L16 16 M16 8 L8 16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <g transform="translate(285, 280)">
              
              <path
                d="M25 40 V20 A22 22 0 0 1 65 20 V40"
                fill="none"
                stroke="#64748b"
                strokeWidth="10"
                strokeLinecap="round"
              />
              
              <rect x="10" y="36" width="70" height="75" rx="18" fill="#bbf7d0" />
              <rect x="6" y="32" width="70" height="75" rx="18" fill="#86efac" />
              
              <circle cx="41" cy="62" r="6" fill="#1e293b" />
              <rect x="39" y="62" width="4" height="14" rx="2" fill="#1e293b" />
            </g>

            <g transform="translate(125, 290)">
              <rect x="0" y="0" width="38" height="90" rx="10" fill="#c4b5fd" />
              <circle cx="19" cy="22" r="8" fill="#7c3aed" />
              <circle cx="19" cy="22" r="4" fill="#ffffff" />
              <circle cx="19" cy="45" r="8" fill="#7c3aed" />
              <circle cx="19" cy="45" r="4" fill="#ffffff" />
              <circle cx="19" cy="68" r="8" fill="#7c3aed" />
              <circle cx="19" cy="68" r="4" fill="#ffffff" />
            </g>

            <g transform="translate(295, 220)">
              <rect x="0" y="0" width="55" height="24" rx="8" fill="#86efac" opacity="0.8" />
              <circle cx="14" cy="12" r="3" fill="#ffffff" />
              <circle cx="27" cy="12" r="3" fill="#ffffff" />
              <circle cx="40" cy="12" r="3" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-[380px]">
          
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full bg-[#eef2f7] border-0 rounded-lg px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf8b53]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Familiyangiz"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full bg-[#eef2f7] border-0 rounded-lg px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf8b53]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Telefon raqamingiz (+998...)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#eef2f7] border-0 rounded-lg px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf8b53]"
                  />
                </div>
              </>
            )}

            <div>
              <input
                type={isLogin ? "text" : "email"}
                required
                placeholder={isLogin ? "Kirish" : "Email"}
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full bg-[#eef2f7] border-0 rounded-lg px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf8b53]"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Parol...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#eef2f7] border-0 rounded-lg px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bf8b53]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                title={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-2.5 px-3.5 bg-white flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
                <span className="text-xs font-medium text-gray-700">Success!</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-sans">
                <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
                <div className="text-right leading-tight">
                  <span className="font-bold text-gray-600 block">CLOUDFLARE</span>
                  <span className="text-[8px] text-gray-400">Privacy · Terms</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bf8b53] hover:bg-[#ab7945] text-white font-bold py-3.5 rounded-lg text-sm tracking-wide transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loading ? "Bajarilmoqda..." : isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-gray-500">
            {isLogin ? (
              <p>
                Hisobingiz yo'qmi?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[#bf8b53] font-semibold hover:underline cursor-pointer"
                >
                  Ro'yxatdan o'tish
                </button>
              </p>
            ) : (
              <p>
                Profilingiz bormi?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="text-[#bf8b53] font-semibold hover:underline cursor-pointer"
                >
                  Kirish sahifasi
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
