// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


const path = require('path');
const reviews = require(path.join(__dirname, 'camera-server', 'reviews.json'));

// Розширюємо CORS доступ для клієнта
app.use(cors());

app.use('/images', express.static(__dirname));

let cameras = [
  {
    id: 1,
    title: "Nikon Coolpix S3100",
    thumbnailUrl: "https://i0.wp.com/retrocam.pl/wp-content/uploads/2025/06/photo_2025-06-17_15-09-07.png?w=949&ssl=1"
  },
  {
    id: 2,
    title: "Sony Cybershot DSC-W55",
    thumbnailUrl: "https://i0.wp.com/retrocam.pl/wp-content/uploads/2025/06/photo_2025-06-17_15-14-07.png?w=949&ssl=1"
  },
  {
    id: 3,
    title: "Casio Exilim EX-S770",
    thumbnailUrl: "https://i0.wp.com/retrocam.pl/wp-content/uploads/2025/06/photo_2025-06-17_15-17-34.png?w=940&ssl=1"
  },
  {
    id: 4,
    title: "Panasonic Lumix DMC-LZ8",
    thumbnailUrl: "https://i0.wp.com/retrocam.pl/wp-content/uploads/2025/06/photo_2025-06-18_09-18-06.png?w=960&ssl=1"
  },
  {
    id: 5,
    title: "Sony Cybershot DSC-W830",
    thumbnailUrl: "https://i0.wp.com/retrocam.pl/wp-content/uploads/2025/06/photo_2025-06-17_14-25-23.png?w=946&ssl=1"
  }
];


app.get('/api/cameras', (req, res) => {
  const shuffled = cameras.sort(() => 0.5 - Math.random());
  const randomThree = shuffled.slice(0, 3);
  res.json(randomThree);
});

app.get('/api/reviews', (req, res) => {
  const shuffled = reviews.sort(() => 0.5 - Math.random());
  const randomThree = shuffled.slice(0, 3);
  res.json(randomThree);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`📡 Сервер працює на http://localhost:${PORT}`);
});

