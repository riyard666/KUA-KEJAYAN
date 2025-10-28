import React, {useRef, useState} from "react";
import EditorJS, {type ToolConstructable} from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import axios from "axios";
import {Loader2} from "lucide-react";
//
export default function BeritaForm() {
    const [loading, setLoading] = useState(false);
    const editorRef = useRef<EditorJS | null>(null);
    const [form, setForm] = useState({
        judul: "",
        slug: "",
        tanggal: new Date().toISOString().slice(0, 16),
        penulis: "",
        gambar: "",
    });
//
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
//
    const initEditor = () => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editorjs",
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
                                    // Mengirim ke Vercel Serverless Function di /api/upload-blob
                                    const VERCEL_UPLOAD_URL = "/api/upload-blob";

                                    const formData = new FormData();
                                    formData.append("file", file); // Key 'file'

                                    try {
                                        const response = await axios.post(
                                            VERCEL_UPLOAD_URL,
                                            formData,
                                            {
                                                // Tidak perlu Content-Type, karena FormData sudah menanganinya
                                            }
                                        );

                                        if (response.data.success === 1) {
                                            return response.data; // { success: 1, file: { url: 'URL Vercel Blob' } }
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
        }
    };

    React.useEffect(() => {
        initEditor();
        return () => editorRef.current?.destroy();
    }, []);
//
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const output = await editorRef.current?.save();
            const konten = JSON.stringify(output);

            const postData = { ...form, konten };

            // PENGGUNAAN AXIOS UNTUK MENGGANTIKAN fetch
            const URL_APPS_SCRIPT = "https://api-portfolio.kodara.web.id/api/submit-berita";

            const response = await axios.post(URL_APPS_SCRIPT, postData, {
                // Axios secara otomatis mengatur 'Content-Type': 'application/json'
                // saat mengirim objek, tapi tetap bisa didefinisikan secara eksplisit jika perlu
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Axios mengembalikan data JSON di properti 'data'
            const result = response.data;
            alert(result.message);

        } catch (error) {
            // Penanganan error yang lebih baik dengan Axios
            console.error("Gagal menyimpan data:", error);
            // Anda mungkin ingin menampilkan pesan error spesifik dari respons jika ada
            alert("Gagal menyimpan data. Cek konsol untuk detail error.");
        }finally {
            setLoading(false);
        }
    };
//
    return (
        <div className="space-y-4 p-6">
            <Input name="judul" placeholder="Judul" value={form.judul} onChange={handleChange} />
            <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
            <Input name="penulis" placeholder="Penulis" value={form.penulis} onChange={handleChange} />
            <Input name="gambar" placeholder="URL Gambar" value={form.gambar} onChange={handleChange} />

            <div id="editorjs" className="border p-3 rounded-lg"></div>

            <Button disabled={loading} onClick={handleSubmit}>
                {loading ? (
                    <>
                        <div className="flex items-center justify-center w-full">
                            <Loader2 className={"animate-spin"}/> Loading...

                        </div>
                    </>
                ) : "Simpan ke Spreadsheet"}
            </Button>
        </div>
    );
}