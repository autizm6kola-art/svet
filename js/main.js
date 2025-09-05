// const headers = document.querySelectorAll("[data-name='headers']");

// headers.forEach(function(item) {
//   item.addEventListener('click', function() {
//     this.nextElementSibling.classList.toggle('none');
//   });
// });

// // Обработка ответа
// function checkAnswer(button, isCorrect) {
//   const question = button.closest('.question');
//   const buttons = question.querySelectorAll('.answer-btn');

//   // Индекс нажатой кнопки в вопросе
//   const selectedIndex = Array.from(buttons).indexOf(button);

//   // Индекс вопроса в контейнере
//   const questionIndex = Array.from(button.closest('.questions-container').children).indexOf(question);

//   // Сохраняем выбранный индекс и правильность в localStorage
//   localStorage.setItem(`answer_${questionIndex}`, JSON.stringify({
//     selectedIndex: selectedIndex,
//     isCorrect: isCorrect
//   }));

//   // Блокируем кнопки
//   buttons.forEach(btn => btn.disabled = true);

//   // Ставим классы
//   buttons.forEach((btn, i) => {
//     btn.classList.remove('correct', 'incorrect');
//     if (i === selectedIndex) {
//       btn.classList.add(isCorrect ? 'correct' : 'incorrect');
//     }
//     if (isCorrect && i !== selectedIndex) {
//       // Подсветить правильный ответ, если выбран неправильный
//       btn.classList.add('correct');
//     }
//   });
// }

// // Восстановление состояния ответов при загрузке страницы
// window.onload = function() {
//   const questions = document.querySelectorAll('.question');

//   questions.forEach((question, index) => {
//     const saved = localStorage.getItem(`answer_${index}`);
//     if (saved) {
//       const data = JSON.parse(saved);
//       const buttons = question.querySelectorAll('.answer-btn');

//       buttons.forEach(btn => {
//         btn.disabled = true;
//         btn.classList.remove('correct', 'incorrect');
//       });

//       buttons.forEach((btn, i) => {
//         if (i === data.selectedIndex) {
//           btn.classList.add(data.isCorrect ? 'correct' : 'incorrect');
//         }
//         if (data.isCorrect && i !== data.selectedIndex) {
//           btn.classList.add('correct');
//         }
//       });
//     }
//   });
// }

// // Функция сброса ответов
// function resetAnswers() {
//   // Очистить localStorage
//   localStorage.clear();

//   // Удалить стили и разблокировать все кнопки
//   const questions = document.querySelectorAll('.question');
  
//   questions.forEach((question) => {
//     const buttons = question.querySelectorAll('.answer-btn');
//     buttons.forEach(button => {
//       button.disabled = false;
//       button.classList.remove('correct', 'incorrect');
//     });
//   });
// }
















const headers = document.querySelectorAll("[data-name = 'headers']");

headers.forEach(function(item) {
    item.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('none');
    })
})





// Обработка ответа
function checkAnswer(button, isCorrect) {
    const question = button.closest('.question');
    const buttons = question.querySelectorAll('.answer-btn');

    // Сохраняем ответ в localStorage
    const index = Array.from(button.closest('.questions-container').children).indexOf(question);
    localStorage.setItem(`answer_${index}`, isCorrect.toString());

   
    
    
    // Блокируем кнопки
    buttons.forEach(button => button.disabled = true);

    // Устанавливаем цвет кнопок в зависимости от ответа
    if (isCorrect) {
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }
}

// Инициализация — восстанавливаем состояние ответов
window.onload = function() {
    const questions = document.querySelectorAll('.question');
    
    questions.forEach((question, index) => {
        const answer = localStorage.getItem(`answer_${index}`);
        if (answer !== null) {
            const buttons = question.querySelectorAll('.answer-btn');
            buttons.forEach(button => button.disabled = true);
            if (answer === 'true') {
                buttons[0].classList.add('correct');
            } else {
                buttons[1].classList.add('incorrect');
            }
        }
    });
}

// Функция сброса ответов
function resetAnswers() {
    // Очистить localStorage
    localStorage.clear();

    // Удалить стили и разблокировать все кнопки
    const questions = document.querySelectorAll('.question');
    
    questions.forEach((question) => {
        const buttons = question.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
            button.disabled = false;
            button.classList.remove('correct', 'incorrect');
        });
    });
}
