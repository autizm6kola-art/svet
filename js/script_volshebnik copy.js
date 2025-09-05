let exercises = [];
let savedAnswers = {};
let currentPage = 1;
const exercisesPerPage = 10;

const app = document.getElementById("app");
const menu = document.getElementById("menu");

function loadAnswers() {
  savedAnswers = JSON.parse(localStorage.getItem("answers_ex2") || "{}");
}

function saveAnswers() {
  localStorage.setItem("answers_ex2", JSON.stringify(savedAnswers));
}

function renderMenu() {
  app.style.display = "none";
  menu.style.display = "block";
  menu.innerHTML = `<h2>Выберите страницу упражнений</h2><div id="pages"></div>`;

  const pagesContainer = document.getElementById("pages");
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    const offset = 1030;
    btn.textContent = `${(i - 1) * exercisesPerPage + 1 + offset}–${i * exercisesPerPage + offset}`;
    btn.style.margin = "5px";
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });
    pagesContainer.appendChild(btn);
  }
}

function renderPage(pageNumber) {
  loadAnswers();

  menu.style.display = "none";
  app.style.display = "block";
  app.innerHTML = "";

  const start = (pageNumber - 1) * exercisesPerPage;
  const pageExercises = exercises.slice(start, start + exercisesPerPage);

  const backToMenuBtn = document.createElement("button");
  backToMenuBtn.textContent = "Назад в меню";
  backToMenuBtn.id = "reset";
  backToMenuBtn.addEventListener("click", renderMenu);
  app.appendChild(backToMenuBtn);

  pageExercises.forEach((exercise, index) => {
    const block = document.createElement("div");
    block.className = "exercise";
    block.dataset.id = exercise.id;

    const title = document.createElement("div");
    title.innerHTML = `<strong>${exercise.id}.</strong>`;
    block.appendChild(title);

    exercise.options.forEach((option, i) => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.textContent = option;

      const isAnswered = exercise.id in savedAnswers;
      const selected = savedAnswers[exercise.id];

      if (isAnswered) {
        btn.classList.add("disabled");
        if (i === selected) {
          btn.classList.add(i === exercise.answer ? "correct" : "wrong");
        } else if (i === exercise.answer) {
          btn.classList.add("correct");
        }
      } else {
        btn.addEventListener("click", () => {
          savedAnswers[exercise.id] = i;
          saveAnswers();
          renderPage(pageNumber); // обновим только текущую страницу
        });
      }

      block.appendChild(btn);
    });

    app.appendChild(block);
  });

  // Навигация по страницам
  const nav = document.createElement("div");
  nav.style.marginTop = "20px";

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  if (pageNumber > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Назад";
    prevBtn.id = "reset";
    prevBtn.addEventListener("click", () => renderPage(pageNumber - 1));
    nav.appendChild(prevBtn);
  }

  if (pageNumber < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Вперёд →";
    nextBtn.id = "reset";
    nextBtn.style.marginLeft = "10px";
    nextBtn.addEventListener("click", () => renderPage(pageNumber + 1));
    nav.appendChild(nextBtn);
  }

  app.appendChild(nav);

  // Кнопка сброса
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Сбросить все ответы";
  resetBtn.id = "reset";
  resetBtn.classList.add("reset-answers");
  resetBtn.addEventListener("click", () => {
    if (confirm("Вы уверены, что хотите сбросить все ответы?")) {
      localStorage.removeItem("answers_ex2");
      savedAnswers = {};
      renderPage(pageNumber);
    }
  });

  // Повтор кнопки "Назад в меню" внизу страницы
const backToMenuBtnBottom = document.createElement("button");
backToMenuBtnBottom.textContent = "Назад в меню";
backToMenuBtnBottom.id = "reset";
backToMenuBtnBottom.style.marginTop = "30px";
backToMenuBtnBottom.addEventListener("click", renderMenu);
app.appendChild(backToMenuBtnBottom);


  app.appendChild(resetBtn);
}



fetch("data/exercises_two.json")
  .then(res => res.json())
  .then(data => {
    exercises = data;
    renderMenu(); // начнем с меню
  });
