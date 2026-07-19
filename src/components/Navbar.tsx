import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ==========================================
// 1. DATA MENU ASLI KUA KEJAYAN
// ==========================================
interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
  submenu?: MenuItem[];
  subSubmenu?: MenuItem[]; // Menjaga kecocokan dengan file lama Anda
}

const menuItems: MenuItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "#",
    submenu: [
      { label: "Profil KUA", href: "/profile" },
      { label: "Data Pegawai", href: "/pegawai" },
    ],
  },
  {
    label: "Layanan",
    href: "#",
    submenu: [
      {
        label: "Nikah",
        href: "#",
        submenu: [
          {
            label: "Pendaftaran Nikah",
            href: "https://simkah4.kemenag.go.id/",
            external: true,
          },
          {
            label: "Rekomendasi Nikah",
            href: "https://s.id/daftar_surat_rekomendasi_nikah",
            external: true,
          },
        ],
      },
      { label: "Kalender Jadwal Nikah", href: "/kalender-jadwal-nikah" },
      { label: "Layanan Digital", href: "/layanan" },
      {
        label: "Dokumen Persyaratan",
        href: "https://drive.google.com/drive/folders/1rQ6sfIe2ZHRLf4mLUDqX5G4dES1lUgWX?usp=drive_link",
        external: true,
      },
    ],
  },
  {
    label: "Informasi",
    href: "#",
    submenu: [
      { label: "Layanan dan Panduan Informasi", href: "/layanan-informasi" },
      { label: "Statistik Nikah", href: "statistik-pernikahan" },
      { label: "Data Masjid", href: "/data-masjid" },
      { label: "Data Tanah Wakaf", href: "/data-wakaf" },
    ],
  },
  { label: "Berita", href: "/news" },
  { label: "Kritik & Saran", href: "/feedback" },
  { label: "Kontak", href: "/kontak" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "";

  // ==========================================
  // 2. FUNGSI MENU DESKTOP (Elegan & Bertingkat)
  // ==========================================
  const renderDesktopMenu = (items: any[] | undefined, level = 0) => {
    if (!items) return null;
    return (
      <ul
        className={`absolute hidden bg-emerald-800 border border-emerald-700 rounded-xl shadow-xl z-50 transition-all duration-300 min-w-[240px] py-2 
        ${level > 0 ? "left-full top-0 ml-1" : "top-full left-0 mt-2"} group-hover/item:block`}
      >
        {items.map((item: any, index: number) => (
          <li key={index} className="relative group/item">
            {item.submenu ? (
              <>
                <button className="flex w-full justify-between items-center px-5 py-2.5 text-white hover:bg-emerald-700 transition-colors duration-200">
                  <span>{item.label}</span>
                  <svg className="w-4 h-4 ml-2 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {renderDesktopMenu(item.submenu, level + 1)}
              </>
            ) : (
              <Link
                to={item.href}
                target={item.external ? "_blank" : "_self"}
                className={`block px-5 py-2.5 text-white hover:bg-emerald-700 transition-colors duration-200 ${
                  item.href === `/${currentPath}` ? "bg-emerald-700 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-800 to-emerald-600 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-8 h-[70px]">
        
        {/* ========================================== */}
        {/* 3. LOGO KUA KEJAYAN */}
        {/* ========================================== */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/10 p-1">
            <img src="/logo-kemenag.png" alt="Logo Kemenag" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-wide">KUA Kejayan</div>
            <div className="text-xs text-emerald-100 font-medium">Kantor Urusan Agama Kejayan</div>
          </div>
        </Link>

        {/* ========================================== */}
        {/* 4. MENU DESKTOP (LAPTOP) */}
        {/* ========================================== */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm">
          {menuItems.map((item: any, i: number) =>
            item.submenu ? (
              <div key={i} className="relative group/item">
                <button className="flex items-center gap-1 px-3 py-2.5 text-white font-medium hover:bg-white/20 transition-all duration-300 rounded-lg">
                  {item.label}
                  <svg className="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {renderDesktopMenu(item.submenu, 0)}
              </div>
            ) : (
              <Link
                key={i}
                to={item.href}
                target={item.external ? "_blank" : "_self"}
                className="px-3 py-2.5 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* ========================================== */}
        {/* 5. TOMBOL MENU MOBILE */}
        {/* ========================================== */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/20 rounded-lg transition-colors" 
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ========================================== */}
      {/* 6. MENU MOBILE (HP) SUPER ELEGAN & AMAN */}
      {/* ========================================== */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-emerald-800 z-[100] border-t border-emerald-700 lg:hidden overflow-y-auto pb-40 shadow-2xl">
          <div className="flex flex-col p-4 space-y-1">
            {menuItems.map((item: any, i: number) => (
              <div key={i}>
                {item.submenu ? (
                  <details className="group">
                    <summary className="cursor-pointer font-medium flex justify-between items-center text-white py-3 px-4 rounded-xl hover:bg-emerald-700/80 transition-all duration-200 [&::-webkit-details-marker]:hidden [list-style:none]">
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-emerald-300 transition-transform duration-300 transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    
                    <div className="flex flex-col pl-6 mt-1 mb-2 border-l-2 border-emerald-500/30 space-y-1 ml-4 transition-all duration-300">
                      {item.submenu?.map((sub: any, j: number) => (
                        <div key={j}>
                          {sub.submenu ? (
                            <details className="group/sub">
                              <summary className="cursor-pointer flex justify-between items-center text-emerald-50 py-2.5 px-4 rounded-lg hover:bg-emerald-700/60 transition-all duration-200 [&::-webkit-details-marker]:hidden [list-style:none]">
                                <span>{sub.label}</span>
                                <svg className="w-3.5 h-3.5 text-emerald-300 transition-transform duration-300 transform group-open/sub:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              
                              <div className="flex flex-col pl-4 mt-1 border-l-2 border-emerald-500/20 space-y-1 ml-2">
                                {sub.submenu?.map((subSub: any, k: number) => (
                                  <Link
                                    key={k}
                                    to={subSub.href}
                                    target={subSub.external ? "_blank" : "_self"}
                                    className="block px-4 py-2.5 text-sm text-emerald-100 hover:text-white hover:bg-emerald-700 transition-colors rounded-lg"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {subSub.label}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link
                              to={sub.href}
                              target={sub.external ? "_blank" : "_self"}
                              className="block px-4 py-2.5 text-emerald-50 hover:text-white hover:bg-emerald-700 transition-colors rounded-lg"
                              onClick={() => setMobileOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.href}
                    target={item.external ? "_blank" : "_self"}
                    className="block px-4 py-3 text-white font-medium hover:bg-emerald-700 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
