import { useState } from "react";

const faolGuruhlar = [
  {
    id: 1,
    nomi: "Full Stack Standart SN2",
    yonalish: "Programming",
    oqituvchilar: 2,
    boshlash: "04 Sen, 2026",
  },
];

const tugaganGuruhlar = [
  {
    id: 1,
    nomi: "Full Stack Standart SN1",
    yonalish: "Programming",
    oqituvchilar: 1,
    boshlash: "23 May, 2026",
    tugagan: "-",
  },
];

function Guruhlarim() {
  const [tab, setTab] = useState("faol");

  const tugaganmi = tab === "tugagan";
  const guruhlar = tugaganmi ? tugaganGuruhlar : faolGuruhlar;

  return (
    <div>
      
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {[
          { key: "faol", text: "Faol" },
          { key: "tugagan", text: "Tugagan" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 -mb-px ${
              tab === t.key
                ? "text-amber-600 border-amber-600"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            {t.text}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left">
              <th className="px-6 py-4 font-bold text-gray-700 w-16">#</th>
              <th className="px-6 py-4 font-bold text-gray-700">Guruh nomi</th>
              <th className="px-6 py-4 font-bold text-gray-700">Yo'nalishi</th>
              <th className="px-6 py-4 font-bold text-gray-700">O'qituvchi</th>
              <th className="px-6 py-4 font-bold text-gray-700">Boshlash vaqti</th>
              
              {tugaganmi && (
                <th className="px-6 py-4 font-bold text-gray-700">Tugagan sana</th>
              )}
            </tr>
          </thead>

          <tbody>
            {guruhlar.map((guruh, index) => (
              <tr key={guruh.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-gray-700">{guruh.nomi}</td>
                <td className="px-6 py-4 text-gray-700">{guruh.yonalish}</td>
                <td className="px-6 py-4">
                  
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    {guruh.oqituvchilar}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{guruh.boshlash}</td>
                {tugaganmi && (
                  <td className="px-6 py-4 text-gray-700">{guruh.tugagan}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Guruhlarim;
