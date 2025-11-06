"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {Eye, EyeOff} from "lucide-react";

// Konfigurasi login
const USERNAME = "3514061";
const PASSWORD = "KEJAYAN67172";
const AUTH_KEY = "kuakejayan_auth";
const DRIVE_GATE = "/go"; // route ke halaman pengarah

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  // kalau sudah login langsung arahkan
  useEffect(() => {
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      navigate(DRIVE_GATE);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === USERNAME && pw === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "true");
      navigate(DRIVE_GATE);
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              K
            </div>
            <h1 className="mt-3 text-xl font-semibold text-emerald-700">Masuk</h1>
            <p className="text-sm text-gray-600">Gunakan akun Anda untuk masuk ke arsip nikah</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>

              {/* wrapper relative supaya tombol show/hide bisa posisinya absolute */}
              <div className="relative">
                <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={(e) => {
                      setPw(e.target.value);
                      if (error) setError("");
                    }}
                    required
                />

                {/* tombol toggle visibility */}
                <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded hover:bg-gray-100 focus:outline-none"
                >
                  {showPw ?  <EyeOff />:<Eye />}
                </Button>
              </div>
            </div>

            {error && (
                <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
            )}

            <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Masuk
            </Button>
          </form>
        </Card>
      </div>
  );
}
