import { useParams, Link } from "react-router-dom";

const malumotlar = {
  "darsga-ishtirok": {
    sarlavha: "Darsga ishtirok bo'yicha natijalar",
    darslar: [
      { nomi: "Dars 9 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "09 Okt, 2026" },
      { nomi: "Dars 8 (3oy)", guruh: "Full Stack Standart SN2", xp: 0, kumush: 0, sana: "07 Okt, 2026" },
      { nomi: "Dars 7 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "05 Okt, 2026" },
      { nomi: "Dars 6 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "02 Okt, 2026" },
      { nomi: "Dars 5 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "30 Sen, 2026" },
      { nomi: "Dars 4 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "28 Sen, 2026" },
      { nomi: "Dars 3 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "25 Sen, 2026" },
      { nomi: "Dars 2 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "23 Sen, 2026" },
      { nomi: "Dars 1 (3oy)", guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "21 Sen, 2026" },
      { nomi: "Imtihon 2oy",  guruh: "Full Stack Standart SN2", xp: 2, kumush: 8, sana: "18 Sen, 2026" },
    ],
  },
  "uyga-vazifa": {
    sarlavha: "Uyga vazifa bo'yicha natijalar",
    darslar: [
      { nomi: "Dars 8 (3oy)", guruh: "Full Stack Standart SN2", xp: 10, kumush: 40, sana: "07 Okt, 2026" },
      { nomi: "Dars 7 (3oy)", guruh: "Full Stack Standart SN2", xp: 10, kumush: 40, sana: "05 Okt, 2026" },
      { nomi: "Dars 6 (3oy)", guruh: "Full Stack Standart SN2", xp: 10, kumush: 40, sana: "02 Okt, 2026" },
    ],
  },
};

function KorsatgichDetails() {
  const { id } = useParams();

  const data = malumotlar[id];
  if (!data) {
    return (
      <div className="space-y-4">
        <p className="text-gray-500">Bunday natija topilmadi</p>
        <Link
          to="/portal/korsatgichlarim"
          className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          ← Ko'rsatgichlarimga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div>
      
      <Link
        to="/portal/korsatgichlarim"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-600 font-medium mb-4 transition-colors"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Ko'rsatgichlarimga qaytish
      </Link>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.sarlavha}</h1>

      <p className="text-sm text-gray-600 mb-1">Guruh</p>
      <button className="bg-transparent text-gray-700 text-sm mb-6 flex items-center gap-1 cursor-pointer">
        Barchasi
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white border-b border-gray-200 text-left">
              <th className="px-6 py-4 font-bold text-gray-700">Dars mavzusi</th>
              <th className="px-6 py-4 font-bold text-gray-700">Guruh</th>
              <th className="px-6 py-4 font-bold text-gray-700">Holati</th>
              <th className="px-6 py-4 font-bold text-gray-700 w-20">XP</th>
              <th className="px-6 py-4 font-bold text-gray-700 w-24">Kumush</th>
              <th className="px-6 py-4 font-bold text-gray-700 w-32">Dars sanasi</th>
            </tr>
          </thead>
          <tbody>
            {data.darslar.map((d, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-gray-700">{d.nomi}</td>
                
                <td className="px-6 py-4 text-gray-700 underline cursor-pointer">
                  {d.guruh}
                </td>
                <td className="px-6 py-4" />
                <td className="px-6 py-4 text-gray-700">{d.xp}</td>
                <td className="px-6 py-4 text-gray-700">{d.kumush}</td>
                <td className="px-6 py-4 text-gray-700">{d.sana}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-end gap-4 px-6 py-4 text-sm text-gray-600">
          <select className="bg-transparent cursor-pointer">
            <option>10</option>
            <option>25</option>
          </select>
          <span>1-{data.darslar.length} gacha, {data.darslar.length} tadan</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KorsatgichDetails;
