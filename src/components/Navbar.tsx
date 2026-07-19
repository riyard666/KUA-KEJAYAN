// src/components/Navbar.tsx
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
            { label: "Dokumen Persyaratan",
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
        return(
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
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {/* 🔑 Ganti parent group jadi group/item */}
                                <ul
                                    className={`absolute hidden bg-emerald-800 border-emerald-700 rounded-xl shadow-lg z-50
                                            ${level > 0 ? "left-full top-0 w-56" : "left-full top-0 w-48"}
                                            group-hover/item:block`}
                                >
                                    {item.submenu.map((sub, j) => (
                                        <li key={j} className="relative group/item">
                                            {sub.submenu ? (
                                                <>
                                                    <button className="flex w-full justify-between items-center px-4 py-2 text-white hover:bg-emerald-700 transition-colors">
                                                        {sub.label}
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                    {renderMenu(sub.submenu, level + 1)}
                                                </>
                                            ) : (
                                                <Link
                                                    to={sub.href}
                                                    target={sub.external ? "_blank" : "_self"}
                                                    className="block px-4 py-2 text-white hover:bg-emerald-700 hover:text-white transition-colors"
                                                >
                                                    {sub.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link
                                to={item.href}
                                target={item.external ? "_blank" : "_self"}
                                className={`block px-4 py-2 text-white hover:bg-emerald-700 transition-colors ${
                                    item.href === currentPath ? "bg-emerald-700 font-semibold" : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        )
    };

    return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-800 to-emerald-600 shadow-md backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center">
            <img src="/logo-kemenag.png" alt="" />
          </div>
          <div>
            <div className="text-lg font-bold text-white">KUA Kejayanan</div>
            <div className="text-xs text-emerald-100">Kantor Urusan Agama Kejayanan</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6 text-sm">
          {menuItems.map((item, i) => (
            <div key={i} className="relative group">
              {item.submenu ? (
                <button className="flex items-center gap-1 px-3 py-2 text-white hover:bg-white/20 transition-all duration-300 rounded-lg">
                  {item.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to={item.href}
                  className="px-3 py-2 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-emerald-800 z-[100] border-t border-emerald-700 lg:hidden overflow-y-auto pb-40">
          <div className="flex flex-col py-4">
            {menuItems.map((item, i) => (
              <div key={i}>
                {item.submenu ? (
                  <details className="px-4 py-2 group">
                    <summary className="cursor-pointer font-medium list-none flex justify-between items-center text-white">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </summary>
                    <div className="flex flex-col pl-4 mt-2 border-l border-emerald-600/50">
                      {item.submenu.map((sub, j) => (
                        <Link
                          key={j}
                          to={sub.href}
                          className="px-4 py-2 text-sm text-emerald-100 hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-white font-medium hover:bg-emerald-700"
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
