import { put } from '@vercel/blob';
import { IncomingForm, File } from 'formidable'; // Import File dari formidable
import { promises as fs } from 'fs';
import type { VercelRequest, VercelResponse } from '@vercel/node'; // Digunakan untuk tipe request

// Konfigurasi penting: agar Vercel/Next.js tidak mencoba mem-parse body
export const config = {
    api: {
        bodyParser: false,
    },
};

// --- Helper untuk Parsing File Upload (Menggunakan Tipe Data Spesifik) ---
// Tipe kembalian yang jelas, menghindari 'any'
interface ParsedForm {
    files: {
        file?: File[]; // 'file' adalah key yang digunakan di frontend (formData.append("file", file))
    };
}

const parseForm = (req: VercelRequest): Promise<ParsedForm> => {
    return new Promise((resolve, reject) => {
        const form = new IncomingForm({
            maxFileSize: 5 * 1024 * 1024, // Batas file 5MB
        });

        // Menggunakan tipe yang sudah ditentukan formidable
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);

            // Mengubah format files yang dikembalikan formidable agar sesuai dengan interface ParsedForm
            resolve({
                files: files as ParsedForm['files']
            });
        });
    });
};


export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: 0, message: 'Method Not Allowed' });
    }

    try {
        // 1. Parsing Multipart/Form-Data
        const { files } = await parseForm(req);

        // Asumsi key file yang dikirim dari Editor.js adalah 'file'
        // Karena formidable mengembalikan array untuk file dengan key yang sama
        const uploadedFile: File | undefined = files.file ? files.file[0] : undefined;

        if (!uploadedFile) {
            return res.status(400).json({ success: 0, message: 'File gambar tidak ditemukan.' });
        }

        // 2. Baca File dari path sementara
        // Catatan: Gunakan uploadedFile.filepath (bukan path)
        if (!uploadedFile.filepath) {
            return res.status(500).json({ success: 0, message: 'Filepath sementara tidak ditemukan.' });
        }
        const fileBuffer = await fs.readFile(uploadedFile.filepath);

        // 3. Simpan ke Vercel Blob Storage
        const filename = uploadedFile.originalFilename || `uploaded-${Date.now()}.bin`;

        const blob = await put(filename, fileBuffer, {
            access: 'public',
            contentType: uploadedFile.mimetype || 'application/octet-stream',
        });

        // 4. Hapus file sementara
        await fs.unlink(uploadedFile.filepath);

        // 5. Kembalikan Respons sesuai format Editor.js
        return res.status(200).json({
            success: 1,
            file: {
                url: blob.url,
            },
        });

    } catch (error) {
        console.error("Blob Upload Error:", error);
        // Tambahkan pengaman untuk error yang tidak diketahui
        const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan tidak dikenal saat upload.';
        return res.status(500).json({
            success: 0,
            message: 'Gagal menyimpan file ke Vercel Blob: ' + errorMessage
        });
    }
}