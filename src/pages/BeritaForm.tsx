import React, {useRef, useState} from "react";
import EditorJS, {type OutputData, type ToolConstructable} from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import axios, {type AxiosError} from "axios";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {useNavigate, useParams} from "react-router-dom";
import {formatForDateTimeLocal} from "@/utils/format.ts"; // Tambahkan useParams

// Definisikan tipe untuk data berita yang akan dimuat
type BeritaData = {
    id?: number;
    judul: string;
    slug: string;
    tanggal: string;
    penulis: string;
    gambar: string;
    deskripsi: string;
    konten: string; // Konten EditorJS dalam bentuk string JSON
};

// ==============================================================================
// KONSTANTA
// ==============================================================================
const URL_BASE_APPS_SCRIPT = "https://script.google.com/macros/s/AKfycbwCWMNNWvvu1HpJrgMUe31Mv0am6SS-i3CJyew1Bwi8_eYFOpQSuuPabzKS7aYDtLrt/exec";
const URL_APPS_SCRIPT_POST_PROXY = "https://api-portfolio.kodara.web.id/api/submit-berita";


export default function BeritaForm() {
    const navigate = useNavigate();
    // Ambil parameter ID dari URL (misalnya: /edit-berita/:id)
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!id); // Set fetching true jika ada ID
    const editorRef = useRef<EditorJS | null>(null);
    const editorInitialized = useRef(false); // Flag untuk memastikan editor hanya diinisialisasi sekali

    const [initialContentData, setInitialContentData] = useState<OutputData | null>(null);

    // Inisialisasi state form dengan nilai default dan siapkan field 'id'
    const [form, setForm] = useState<BeritaData & { id?: number }>({
        id: id ? parseInt(id) : undefined, // Set ID jika ada
        judul: "",
        slug: "",
        tanggal: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta', hour12: false }).replace(' ', 'T').slice(0, 16),
        penulis: "",
        gambar: "",
        deskripsi: "",
        konten: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ==============================================================================
    // LOGIKA EDITORJS
    // ==============================================================================

    const initEditor = (initialData: OutputData | null = null) => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editorjs",
                // Jika ada initialData, gunakan. Jika tidak, EditorJS akan membuat paragraf kosong.
                data: initialData || undefined,
                tools: {
                    header: {
                        class: Header as unknown as ToolConstructable,
                        inlineToolbar: ["link"],
                        config: {
                            placeholder: "Header",
                            levels: [1, 2, 3, 4],
                            defaultLevel: 2,
                        },
                    },
                    paragraph: {
                        class: Paragraph as unknown as ToolConstructable,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    const VERCEL_UPLOAD_URL = "/api/upload-blob";
                                    // ... (Logika upload gambar tetap sama) ...
                                    const formData = new FormData();
                                    formData.append("file", file);

                                    try {
                                        const response = await axios.post(
                                            VERCEL_UPLOAD_URL,
                                            formData
                                        );

                                        if (response.data.success === 1) {
                                            return response.data;
                                        } else {
                                            throw new Error(response.data.message || "Upload gagal.");
                                        }
                                    } catch (error) {
                                        console.error("Upload error:", error);
                                        return {
                                            success: 0,
                                            message: "Upload gambar gagal."
                                        };
                                    }
                                }
                            }
                        }
                    },
                },
            });
            editorInitialized.current = true;
        }
    };

    // ==============================================================================
    // LOGIKA FETCH DATA (GET by ID)
    // ==============================================================================
    React.useEffect(() => {
        // Jika ada ID di URL, lakukan fetching data
        if (id) {
            const fetchData = async () => {
                setIsFetching(true);
                try {
                    // Gunakan URL Apps Script GET dengan parameter ID
                    const response = await axios.get(`${URL_BASE_APPS_SCRIPT}?id=${id}`);
                    const result = response.data;

                    if (result.success && result.data) {
                        const fetchedData = result.data;

                        // Isi form state dengan data yang diambil
                        const formattedTanggal = formatForDateTimeLocal(fetchedData.tanggal || '');

                        setForm({
                            id: parseInt(id),
                            judul: fetchedData.judul || "",
                            slug: fetchedData.slug || "",
                            // Gunakan tanggal yang sudah diformat
                            tanggal: formattedTanggal || new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta', hour12: false }).replace(' ', 'T').slice(0, 16),
                            penulis: fetchedData.penulis || "",
                            gambar: fetchedData.gambar || "",
                            deskripsi: fetchedData.deskripsi || "",
                            konten: fetchedData.konten || ""
                        });

                        // Inisialisasi EditorJS dengan konten lama
                        if (fetchedData.konten) {
                            try {
                                const initialContent = JSON.parse(fetchedData.konten);
                                setInitialContentData(initialContent);
                            } catch (parseError) {
                                console.error(parseError);
                                toast.error("Gagal memparsing konten EditorJS.");
                                setInitialContentData(null);
                            }
                        } else {
                            setInitialContentData(null);
                        }

                    } else {
                        toast.error(result.message || "Gagal mengambil data berita.");
                        // Jika gagal, inisialisasi editor kosong
                        setInitialContentData(null);
                    }
                } catch (error) {
                    const errorMessage = error as AxiosError<{message?: string}>
                    toast.error(errorMessage.message || "Gagal terhubung untuk mengambil data.");
                    setInitialContentData(null); // Jika error, inisialisasi editor kosong
                } finally {
                    setIsFetching(false);
                }
            };

            fetchData().then(console.error);
        } else {
            // Jika tidak ada ID, inisialisasi editor tanpa data awal
            setInitialContentData(null);
            setIsFetching(false);
        }
    }, [id]); // Jalankan ulang jika ID berubah

    // ==============================================================================
    // LOGIKA INISIALISASI EDITORJS - BERGANTUNG PADA KESIAPAN FORM & DOM
    // ==============================================================================
    React.useEffect(() => {
        // Jalankan inisialisasi hanya jika:
        // 1. Editor belum diinisialisasi
        // 2. Data fetching sudah selesai (isFetching == false)
        if (!editorRef.current && !isFetching) {
            // Panggil setInitialContentData dengan data yang sudah disimpan
            initEditor(initialContentData);
        }

        // Cleanup Function (dijalankan saat komponen unmount atau re-run)
        return () => {
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [isFetching, initialContentData]); // Jalankan ulang saat fetching selesai atau konten data berubah

    // ==============================================================================
    // LOGIKA SUBMIT (CREATE/UPDATE)
    // ==============================================================================

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const output = await editorRef.current?.save();
            const konten = JSON.stringify(output);

            // Jika ada ID di form, ia akan secara otomatis memicu logika UPDATE di Apps Script
            const postData = { ...form, konten };

            const response = await axios.post(URL_APPS_SCRIPT_POST_PROXY, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;
            const action = form.id ? "diperbarui" : "ditambahkan";
            toast.success(`Data berhasil ${action}. Pesan: ${result.message}`);
            navigate('/admin/news')

        } catch (error) {
            const errorMessage = error as AxiosError<{message?: string}>
            toast.error(errorMessage.response?.data.message || "Gagal menyimpan/memperbarui data.");
            console.error("Submit Error:", error);
        }finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        // NOTE: Logika inisialisasi dipindahkan ke useEffect [id] di atas.
        // Ini hanya untuk cleanup.

        return () => {
            // Hancurkan instance saat komponen di-unmount
            if (editorRef.current && typeof editorRef.current.destroy === 'function') {
                editorRef.current.destroy();
                editorRef.current = null; // Set kembali ke null
            }
        };
    }, []); // Array kosong berarti hanya dijalankan saat mount dan unmount

    // ==============================================================================
    // RENDER
    // ==============================================================================

    // Tampilkan loader saat fetching data lama untuk mode edit
    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin mr-2" size={32} />
                Memuat data berita...
            </div>
        );
    }

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-2xl font-bold">{id ? "Edit Berita " : "Buat Berita Baru"}</h1>
            {/* Input fields diisi oleh state 'form' */}
            <Input name="judul" placeholder="Judul" value={form.judul} onChange={handleChange} />
            <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
            <Input name="tanggal" placeholder="Tanggal" type="datetime-local" value={form.tanggal} onChange={handleChange} />
            <Input name="penulis" placeholder="Penulis" value={form.penulis} onChange={handleChange} />
            <Input name="gambar" placeholder="URL Gambar" value={form.gambar} onChange={handleChange} />
            <Input name="deskripsi" placeholder="Deskripsi Singkat" value={form.deskripsi} onChange={handleChange} />

            <div id="editorjs" className="border p-3 rounded-lg"></div>

            <Button disabled={loading} onClick={handleSubmit}>
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-2"/> {id ? "Memperbarui Data..." : "Menyimpan Data..."}
                    </>
                ) : (id ? "Perbarui Data" : "Simpan ke Spreadsheet")}
            </Button>
        </div>
    );
}