import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Login() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-6">
                <div className="text-center mb-6">
                    <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                        K
                    </div>
                    <h1 className="mt-3 text-xl font-semibold text-emerald-700">Masuk</h1>
                    <p className="text-sm text-gray-600">Gunakan akun Anda untuk masuk</p>
                </div>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="nama@domain.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input id="password" type="password" placeholder="••••••••" required />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            Ingat saya
                        </label>
                        <a href="#" className="text-emerald-700 hover:underline">Lupa kata sandi?</a>
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Masuk</Button>
                </form>
            </Card>
        </div>
    );
}