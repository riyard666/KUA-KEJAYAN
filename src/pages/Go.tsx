import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AUTH_KEY = "kuakejayan_auth";
const DRIVE_URL =
    "https://drive.google.com/drive/folders/1oLNrd9SUhTxvm0hAgQ5NuDZ8xIKxIDDW?usp=sharing";

export default function GoPage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem(AUTH_KEY) !== "true") {
            navigate("/login", { replace: true });
        } else {
            window.location.replace(DRIVE_URL);
            sessionStorage.clear()
        }
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            Mengarahkan ke Drive…
        </div>
    );
}
