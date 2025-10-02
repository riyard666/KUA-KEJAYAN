// src/components/Navbar.tsx
import { useState } from "react";
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
            { label: "Kalkulator Zakat", href: "https://baznas.go.id/kalkulatorzakat" },
            { label: "Kalibrasi Arah Kiblat", href: "https://qiblafinder.withgoogle.com/intl/id/desktop/find" },
        ],
    },
    {
        label: "Informasi",
        href: "#",
        submenu: [
            { label: "Layanan dan Panduan Informasi", href: "*" },
            { label: "Statistik Nikah", href: "*" },
            { label: "Data Masjid", href: "/data-masjid" },
            { label: "Data Tanah Wakaf", href: "/data-wakaf" },
        ],
    },
    { label: "Berita", href: "*" },
    { label: "Kritik & Saran", href: "/feedback" },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = window.location.pathname.split("/").pop();

    const renderMenu = (items: MenuItem[], level = 0) => {
        return(
            <ul
                className={`absolute hidden bg-white border rounded-xl shadow-lg z-50
             ${level > 0 ? "left-full top-0 w-56" : "top-full left-0 w-48"} group-hover:block`}
            >
                {items.map((item, i) => (
                    <li key={i} className="relative group/item">
                        {item.submenu ? (
                            <>
                                <button className="flex w-full justify-between items-center px-4 py-2 rounded-t-lg hover:bg-gray-100">
                                    {item.label}
                                    {level !== 0 ? (
                                        <ChevronDown className="w-4 h-4" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>

                                {/* 🔑 Ganti parent group jadi group/item */}
                                <ul
                                    className={`absolute hidden bg-white border rounded-xl shadow-lg z-50
                                            ${level > 0 ? "left-full top-0 w-56" : "left-full top-0 w-48"}
                                            group-hover/item:block`}
                                >
                                    {item.submenu.map((sub, j) => (
                                        <li key={j} className="relative group/item">
                                            {sub.submenu ? (
                                                <>
                                                    <button className="flex w-full justify-between items-center px-4 py-2 hover:bg-gray-100">
                                                        {sub.label}
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                    {renderMenu(sub.submenu, level + 1)}
                                                </>
                                            ) : (
                                                <Link
                                                    to={sub.href}
                                                    target={sub.external ? "_blank" : "_self"}
                                                    className="block px-4 py-2 hover:bg-gray-100"
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
                                className={`block px-4 py-2 hover:bg-gray-100 ${
                                    item.href === currentPath ? "font-semibold text-emerald-700" : ""
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
        <header className="sticky top-0 z-50 w-full border-b bg-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <div>
                        <div className="text-lg font-bold">KUA Kejayan</div>
                        <div className="text-xs text-gray-500">Kantor Urusan Agama Kejayan</div>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 text-sm">
                    {menuItems.map((item, i) =>
                        item.submenu ? (
                            <div key={i} className="relative group">
                                <button className="flex items-center gap-1 px-3 py-2 hover:bg-gray-100 rounded-xl">
                                    {item.label}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                {/* Dropdown submenu */}
                                {renderMenu(item.submenu)}
                            </div>
                        ) : (
                            <Link
                                key={i}
                                to={item.href}
                                className={`px-3 py-2 rounded-xl hover:bg-gray-100 ${
                                    item.href === currentPath ? "font-semibold text-emerald-700" : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>


                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden border-t">
                    <div className="flex flex-col py-2">
                        {menuItems.map((item, i) =>
                            item.submenu ? (
                                <details key={i} className="px-4 py-2">
                                    <summary className="cursor-pointer font-medium">
                                        {item.label}
                                    </summary>
                                    <div className="flex flex-col pl-4 mt-1">
                                        {item.submenu.map((sub, j) =>
                                            sub.submenu ? (
                                                <details key={j} className="pl-2 py-1">
                                                    <summary className="cursor-pointer">
                                                        {sub.label}
                                                    </summary>
                                                    <div className="flex flex-col pl-4 mt-1">
                                                        {sub.submenu.map((deep, k) => (
                                                            <Link
                                                                key={k}
                                                                to={deep.href}
                                                                target={deep.external ? "_blank" : "_self"}
                                                                className="px-2 py-1 hover:bg-gray-100"
                                                            >
                                                                {deep.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </details>
                                            ) : (
                                                <Link
                                                    key={j}
                                                    to={sub.href}
                                                    target={sub.external ? "_blank" : "_self"}
                                                    className="px-2 py-1 hover:bg-gray-100"
                                                >
                                                    {sub.label}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </details>
                            ) : (
                                <Link
                                    key={i}
                                    to={item.href}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
