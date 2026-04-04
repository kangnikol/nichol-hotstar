import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Series": "Series",
      "Movies": "Movies",
      "Trending Movies": "Trending Movies",
      "Top Rated Movies": "Top Rated Movies",
      "Trending TV": "Trending TV",
      "Top Rated TV": "Top Rated TV",
      "View More": "View More",
      "See Detail": "See Detail",
      "Watch Now": "Watch Now",
      "Watch Trailer": "Watch Trailer",
      "Cast": "Cast",
      "Trailers & Clips": "Trailers & Clips",
      "More Like This": "More Like This",
      "Enter Title": "Enter Title",
      "Search": "Search",
      "Load More": "Load More",
      "Movie": "Movie",
      "TV Series": "TV Series",
      "About Us": "About Us",
      "Careers": "Careers",
      "Terms of Use": "Terms of Use",
      "Privacy Policy": "Privacy Policy",
      "View Website in": "View Website in",
      "Need Help?": "Need Help?",
      "Visit Help Center": "Visit Help Center",
      "Share Feedback": "Share Feedback",
      "Connect with Us": "Connect with Us",
      "Back to Details": "Back to Details",
      "Company": "Company",
      "Select Episode": "Select Episode",
      "Loading...": "Loading...",
      "Continue Watching": "Continue Watching"
    }
  },
  id: {
    translation: {
      "Home": "Beranda",
      "Series": "Serial TV",
      "Movies": "Film",
      "Trending Movies": "Film Sedang Tren",
      "Top Rated Movies": "Film Rating Tertinggi",
      "Trending TV": "Serial TV Sedang Tren",
      "Top Rated TV": "Serial TV Rating Tertinggi",
      "View More": "Lihat Semua",
      "See Detail": "Lihat Detail",
      "Watch Now": "Tonton Sekarang",
      "Watch Trailer": "Lihat Trailer",
      "Cast": "Pemeran",
      "Trailers & Clips": "Trailer & Klip",
      "More Like This": "Mirip Dengan Ini",
      "Enter Title": "Masukkan Judul...",
      "Search": "Cari",
      "Load More": "Muat Lebih Banyak",
      "Movie": "Film",
      "TV Series": "Serial TV",
      "About Us": "Tentang Kami",
      "Careers": "Karier",
      "Terms of Use": "Syarat Penggunaan",
      "Privacy Policy": "Kebijakan Privasi",
      "View Website in": "Tampilkan Website Dalam",
      "Need Help?": "Butuh Bantuan?",
      "Visit Help Center": "Kunjungi Pusat Bantuan",
      "Share Feedback": "Bagikan Masukan",
      "Connect with Us": "Terhubung Dengan Kami",
      "Back to Details": "Kembali ke Detail",
      "Company": "Perusahaan",
      "Select Episode": "Pilih Episode",
      "Loading...": "Memuat...",
      "Continue Watching": "Terakhir Ditonton"
    }
  }
}

// Retrieve saved language from local storage, default to 'en'
const savedLanguage = localStorage.getItem("i18nextLng") || "en"

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  })

// Save language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem("i18nextLng", lng)
})

export default i18n
