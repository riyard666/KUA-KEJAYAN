import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// ==========================================
// 1. DATA MENU ASLI KUA KEJAYAN
// ==========================================
type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
  submenu?: MenuItem[];
  subSubmenu?: MenuItem[]; // Tetap dipertahankan agar tidak bentrok dengan file lain
};

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
  // Ditambahkan || "" agar TypeScript menjamin variabel ini selalu berupa string
  const currentPath = location.pathname.split("/").pop() || "";

  // ==========================================
  // 2. FUNGSI MENU DESKTOP (Elegan & Bertingkat)
  // ==========================================
  const renderDesktopMenu = (items: MenuItem[] | undefined, level = 0) => {
    return (
      <ul
        className={`absolute hidden bg-emerald-800 border border-emerald-700 rounded-xl shadow-xl z-50 transition-all duration-300 min-w-[240px] py-2 
        ${level > 0 ? "left-full top-0 ml-1" : "top-full left-0 mt-2"} group-hover/item:block`}
      >
        {items?.map((item, index) => (
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
          {menuItems.map((item, i) =>
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
          className="lg:hidden text-white p-2 hover
