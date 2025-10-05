export interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

export interface PrayerData {
    timings: PrayerTimes;
    date: {
        readable: string;
        hijri: {
            date: string;
        };
    };
}

export async function fetchPrayerTimes(lat: number, lon: number): Promise<PrayerData> {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta';
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=20&timezonestring=${encodeURIComponent(tz)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.data) {
        throw new Error('Failed to fetch prayer times');
    }

    return data.data;
}

export function getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
            reject(new Error('Geolocation not supported'));
            return;
        }

        const options = {
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 300000
        };

        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export async function getCityAndCountry(lat: number, lon: number): Promise<string> {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
    );
    const data = await res.json();


    console.log(data);
    return `${data.display_name}`;
}


export const FALLBACK_LOCATION = {
    lat: -7.70139,
    lon: 112.87694,
    label: "Kejayan, Indonesia"
};