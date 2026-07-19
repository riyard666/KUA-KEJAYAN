import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  href: string;
  external?: boolean;
  submenu?: MenuItem[];
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
          { label: "Pendaftaran Nikah", href: "https://simkah4.kemenag.go.id/", external: true },
          { label: "Rekomendasi Nikah", href: "https://s.id/daftar_surat_rekomendasi_nikah", external: true },
        ],
      },
      { label: "Kalender Jadwal Nikah", href: "/kalender-jadwal-nikah" },
      { label: "Layanan Digital", href: "/layanan" },
      { label: "Dokumen Persyaratan", href: "https://drive.google.com/drive/folders/1rQ6sfIe2ZHRLf4mLUDqX5G4dES1lUgWX?usp=drive_link", external: true },
    ],
  },
  {
    label: "Informasi",
    href: "#",
    submenu: [
      { label: "Layanan dan Panduan Informasi", href: "/layanan-informasi" },
      { label: "Statistik Nikah", href: "/statistik-pernikahan" },
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
      if (window.scrollY > 20) setMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMenu = (items: MenuItem[], level = 0) => {
    return (
      <ul
        className={`absolute bg-emerald-800 rounded-xl shadow-xl z-[100] transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          ${level > 0 ? "left-full top-0 w-56" : "top-full left-0 w-60 pt-2"}
        `}
      >
        {items.map((item, i) => (
          <li key={i} className="relative group/item">
            {item.submenu ? (
              <div className="flex w-full justify-between items-center px-4 py-3 text-white hover:bg-emerald-700 transition-colors duration-200 cursor-pointer">
                {item.label}
                <ChevronRight className="w-4 h-4" />
                {renderMenu(item.submenu, level + 1)}
              </div>
            ) : (
              <Link
                to={item.href}
                target={item.external ? "_blank" : "_self"}
                className={`block px-4 py-3 text-white hover:bg-emerald-700 transition-colors ${
                  item.href === currentPath ? "bg-emerald-700 font-semibold" : ""
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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-800 to-emerald-600 shadow-md backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
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
        <nav className="hidden lg:flex items-center gap-2 text-sm h-full">
          {menuItems.map((item, i) => (
            <div key={i} className="relative group h-full flex items-center">
              {item.submenu ? (
                <>
                  <button className="flex items-center gap-1 px-4 py-6 text-white hover:bg-white/10 transition-all duration-300">
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {renderMenu(item.submenu)}
                </>
              ) : (
                <Link
                  to={item.href}
                  className="px-4 py-6 text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-emerald-800/95 backdrop-blur-md z-[100] border-t border-emerald-700 lg:hidden pb-10 shadow-xl">
          <div className="flex flex-col py-4">
            {menuItems.map((item, i) => (
              <div key={i}>
                {item.submenu ? (
                  <details className="px-4 py-2 group">
                    <summary className="cursor-pointer font-medium list-none flex justify-between items-center text-white">
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="flex flex-col pl-4 mt-2 border-l border-emerald-600/50 space-y-1">
                      {item.submenu.map((sub, j) => (
                        <div key={j}>
                          {sub.submenu ? (
                            <details className="py-1 group/sub">
                              <summary className="cursor-pointer text-sm flex justify-between items-center text-emerald-100 py-1">
                                {sub.label}
                                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-open/sub:rotate-180" />
                              </summary>
                              <div className="flex flex-col pl-4 mt-1 border-l border-emerald-600/30 space-y-1">
                                {sub.submenu.map((subSub, k) => (
                                  <Link key={k} to={subSub.href} target={subSub.external ? "_blank" : "_self"} className="px-4 py-1.5 text-xs text-emerald-200 hover:text-white block" onClick={() => setMobileOpen(false)}>
                                    {subSub.label}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link to={sub.href} className="px-4 py-2 text-sm text-emerald-100 hover:text-white block" onClick={() => setMobileOpen(false)}>
                              {sub.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link to={item.href} className="block px-4 py-3 text-white font-medium hover:bg-emerald-700" onClick={() => setMobileOpen(false)}>
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
