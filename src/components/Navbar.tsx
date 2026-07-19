import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
  submenu?: MenuItem[];
  subSubmenu?: MenuItem[];
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
  const currentPath = window.location.pathname.split("/").pop();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMenu = (items: MenuItem[], level = 0) => {
    return (
      <ul
        className={`absolute bg-emerald-800 rounded-xl shadow-xl z-50 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300
                ${level > 0 ? "left-full top-0 w-56" : "top-full left-0 w-48"}`}
      >
        {items.map((item, i) => (
          <li key={i} className="relative group/item">
            {item.submenu ? (
              <>
                <button className="flex w-full justify-between items-center px-4 py-2 text-white hover:bg-emerald-700 transition-colors duration-200">
                  {item.label}
                  {level !== 0 ? (
                    <ChevronDown className="w-4 h-4 text-emerald-300" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-emerald-300" />
                  )}
                </button>

                <ul
                  className={`absolute hidden bg-emerald-800 border border-emerald-700 rounded-xl shadow-lg z-50
                                            ${level > 0 ? "left-full top-0 w-56" : "left-full top-0 w-48"}
                                            group-hover/item:block`}
                >
                  {item.submenu.map((sub, j) => (
                    <li key={j} className="relative group/item">
                      {sub.submenu ? (
                        <>
                          <button className="flex w-full justify-between items-center px-4 py-2 text-white hover:bg-emerald-700 transition-colors">
                            {sub.label}
                            <ChevronRight className="w-4 h-4 text-emerald-300" />
                          </button>
                          {renderMenu
