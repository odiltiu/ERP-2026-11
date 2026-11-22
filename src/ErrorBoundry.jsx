import { Link, useRouteError } from "react-router-dom";

function ErrorBoundry() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#eef1f8]">
      <div className="text-center max-w-md bg-white border border-gray-200 rounded-2xl p-8">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-3xl mx-auto mb-4">
          ⚠️
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Xatolik yuz berdi</h1>
        <p className="text-gray-500 text-sm mb-6">
          {error?.statusText || error?.message || "Kutilmagan xatolik. Birozdan so'ng qayta urinib ko'ring."}
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors px-6 py-3 rounded-xl font-semibold text-white"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default ErrorBoundry;
