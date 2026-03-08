import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000; // Render usa el 10000 por defecto

app.use(cors());
app.use(express.json());

// 📂 CONFIGURACIÓN DEL CDN
const cdnPath = path.join(__dirname, 'public/cdn');
fs.ensureDirSync(cdnPath);
app.use('/cdn', express.static(cdnPath));

// 🛠️ FUNCIÓN PARA LIMPIAR EL CDN (Para que no se llene el disco de Render)
setInterval(() => {
    fs.emptyDirSync(cdnPath);
    console.log('🧹 CDN Limpiado para ahorrar espacio');
}, 1000 * 60 * 60); // Se limpia cada hora

// === ENDPOINTS PARA TU BOT ===

// 1. TikTok Downloader
app.get('/api/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, msg: "Falta la URL" });
    
    try {
        // Aquí iría tu scraper. Por ahora, devolvemos la estructura que tu bot espera
        res.json({
            status: true,
            data: {
                title: "Video Descargado vía Musicart",
                dl: "URL_DEL_VIDEO_AQUÍ", 
                author: { nickname: "Musicart API" }
            }
        });
    } catch (e) {
        res.json({ status: false, msg: "Error en el servidor" });
    }
});

// Ruta base
app.get('/', (req, res) => res.send("🚀 Musicart API & CDN están LIVE"));

app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));
