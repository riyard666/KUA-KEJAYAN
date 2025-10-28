import React, { useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BeritaForm() {
    const editorRef = useRef<EditorJS | null>(null);
    const [form, setForm] = useState({
        judul: "",
        slug: "",
        tanggal: new Date().toISOString().slice(0, 16),
        penulis: "",
        gambar: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const initEditor = () => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                holder: "editorjs",
                tools: { header: Header, paragraph: Paragraph, image: ImageTool },
            });
            editorRef.current = editor;
        }
    };

    React.useEffect(() => {
        initEditor();
        return () => editorRef.current?.destroy();
    }, []);

    const handleSubmit = async () => {
        const output = await editorRef.current?.save();
        const konten = JSON.stringify(output);

        const res = await fetch("https://script.google.com/macros/s/AKfycbyCHF86UchGgqwvltfYMkpDZnbq63wKMH_UC0i8Oixw4urhC7079KTTGNpFYwjE3D6b/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, konten }),
        });

        const result = await res.json();
        alert(result.message);
    };

    return (
        <div className="space-y-4 p-6">
            <Input name="judul" placeholder="Judul" value={form.judul} onChange={handleChange} />
            <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} />
            <Input name="penulis" placeholder="Penulis" value={form.penulis} onChange={handleChange} />
            <Input name="gambar" placeholder="URL Gambar" value={form.gambar} onChange={handleChange} />

            <div id="editorjs" className="border p-3 rounded-lg"></div>

            <Button onClick={handleSubmit}>Simpan ke Spreadsheet</Button>
        </div>
    );
}