# Oksana-Bondarenko-website
Рамкове завдання 

Реалізувати інтерфейсну частину сайту (фронтенд) так, щоб забезпечувалося виконання наступних вимог:
-	отримання від сервера набору інформаційних одиниць у вигляді JSON-даних
  async function fetchLatestCameras() {
    try {
      const response = await fetch('http://localhost:3000/api/cameras');
      if (!response.ok) throw new Error('Помилка при завантаженні');

      const data = await response.json();
      const container = document.getElementById('items-container');
      container.innerHTML = ''; 

      data.forEach(camera => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
          <div class="card h-100 text-center">
            <img src="${camera.thumbnailUrl}" class="card-img-top" alt="${camera.title}">
            <div class="card-body">
              <h5 class="card-title">${camera.title}</h5>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Не вдалося оновити камери:", error);
    }
  }
-	форматоване відображення інформаційних одиниць на сторінці; для цього використати компоненти React або Vue (йдеться про client-side rendering)
  
  <script>
  document.addEventListener("DOMContentLoaded", () => {
    const pairs = [
      { img: 'img1', desc: 'desc1' },
      { img: 'img2', desc: 'desc2' },
      { img: 'img3', desc: 'desc3' }
    ];

    pairs.forEach(({ img, desc }) => {
      const image = document.getElementById(img);
      const box = document.getElementById(desc);
      if (!image || !box) return;

      image.addEventListener("click", () => {
        box.style.display = box.style.display === "block" ? "none" : "block";
      });
    });
  });
</script>

-	навпроти кожної інформаційної одиниці має бути інтерфейсний елемент (імовірно, кнопка або гіпертекстове посилання), яке забезпечує відображення більш розгорнутого опису цієї одиниці
  
  <div class="text-center mt-5">
  <h2>User login</h2>
  <form id="login-form" class=" p-4 mx-auto mb-4" style="max-width: 400px;">
    <div class="mb-3 text-start">
      <label for="email" class="form-label">Email:</label>
      <input type="email" id="email" class="form-control" required>
    </div>
    <div class="mb-3 text-start">
      <label for="password" class="form-label">Password:</label>
      <input type="password" id="password" class="form-control" required>
    </div>
    <button type="submit" class="btn w-100 interactive-btn">Log in</button>
    <div id="login-error" class="text-danger mt-2"></div>
  </form>
</div>


-	форма для входу зареєстрованих користувачів; забезпечити належну валідацію (принаймні щоб поля введення не залишалися пустими); подбати про належний захист від небажаного введення
  
  Я використала HTML5 атрибути required для валідації.
Поле type="email" також захищає від неправильного введення.

-	реалізувати AJAX: періодичне оновлення сторінки, асинхронне отримання нової інформації тощо
  Це оновлення reviews кожні 10 секунд
<script>
  function fetchReviews() {
    fetch("http://localhost:3000/api/reviews")
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("reviews-container");
        container.innerHTML = data.map(r =>
          `<div><strong>${r.user}:</strong>${r.review}</div>`
        ).join('');
      })
      .catch(error => {
        document.getElementById("reviews-container").innerText = "Не вдалося завантажити відгуки.";
        console.error("AJAX error:", error);
      });
  }

  fetchReviews();
  setInterval(fetchReviews, 10000);
</script>

Це періодичне оновлення набору камер в кінці сайту кожні 5 сек
  <script>
  // періодичне оновлення
  async function fetchLatestCameras() {
    try {
      const response = await fetch('http://localhost:3000/api/cameras');
      if (!response.ok) throw new Error('Помилка при завантаженні');

      const data = await response.json();
      const container = document.getElementById('items-container');
      container.innerHTML = ''; 

      data.forEach(camera => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
          <div class="card h-100 text-center">
            <img src="${camera.thumbnailUrl}" class="card-img-top" alt="${camera.title}">
            <div class="card-body">
              <h5 class="card-title">${camera.title}</h5>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Не вдалося оновити камери:", error);
    }
  }

  // Періодично
  document.addEventListener('DOMContentLoaded', () => {
    fetchLatestCameras();                
    setInterval(fetchLatestCameras, 5000);
  });
</script>

-	реалізувати додаткову функціональність (опитування, вікторина і т.п.) з використанням інших інтерфейсних елементів – таких, як випадаючі списки, радіокнопки тощо

  <div class="container my-5 d-flex flex-column align-items-center">
  <h3>What is ur favourite camera brand?</h3>
  <form id="survey-form" style="max-width: 525px; width: 100%;">
    <label><input type="radio" name="camera" value="Canon" required> Canon</label><br>
    <label><input type="radio" name="camera" value="Nikon"> Nikon</label><br>
    <label><input type="radio" name="camera" value="Sony"> Sony</label><br>
    <label><input type="radio" name="camera" value="Lumix"> Lumix</label><br>
    <label><input type="radio" name="camera" value="️Olympus">Olympus</label><br>
    <button type="submit" class="btn w-100 interactive-btn mt-3">Send</button>
  </form>
  <div id="result" class="mt-3"></div>
</div>

І саме збережння відповіді яке видає "Your favorite camera brand is:"

<script>   
  document.getElementById("survey-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    const selected = document.querySelector('input[name="camera"]:checked');
    const resultBox = document.getElementById("result");

    if (selected) {
      resultBox.innerHTML = `<strong>Your favorite camera brand is:</strong> ${selected.value}`;
    } else {
      resultBox.innerHTML = "Please select a camera brand.";
    }
  });
</script>
  


