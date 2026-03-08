import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 📂 EL CDN: Aquí se guardarán los videos/fotos temporalmente
const cdnPath = path.join(__dirname, 'public/cdn');
fs.ensureDirSync(cdnPath);
app.use('/cdn', express.static(cdnPath));

// 🚀 RUTA DE PRUEBA: Para saber si tu API está viva
app.get('/', (req, res) => {
    res.json({ status: true, msg: "Musicart API Online 🚀" });
});

// 📥 EJEMPLO DOWNLOADER (Para tu TikTok, FB, etc.)
app.get('/dl/any', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json({ status: false, msg: "Falta la URL" });
    
    // Aquí tu API hará la magia y le dirá al bot:
    res.json({
        status: true,
        data: {
            title: "Archivo Musicart",
            dl: `https://${req.get('host')}/cdn/archivo_temporal.mp4` // <--- Esto es tu CDN
        }
    });
});

app.listen(PORT, () => console.log(`API encendida en puerto ${PORT}`));
