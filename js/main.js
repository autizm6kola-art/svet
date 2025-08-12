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
