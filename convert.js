const fs = require('fs');

const inputFile = 'input.txt';     // Твой txt-файл
const outputFile = 'exercises.json'; // JSON на выходе

// Читаем строки и фильтруем пустые
const lines = fs.readFileSync(inputFile, 'utf-8').split('\n').filter(Boolean);

// Преобразуем каждую строку в объект
const data = lines.map((line, index) => {
  const parts = line.split('|').map(p => p.trim());

  if (parts.length !== 4) {
    console.warn(`⚠️ Строка ${index + 1} пропущена: некорректное количество элементов`);
    return null;
  }

  const [idStr, opt1, opt2, answerStr] = parts;

  return {
    id: parseInt(idStr, 10),
    options: [opt1, opt2],
    answer: parseInt(answerStr, 10)
  };
}).filter(Boolean); // Убираем null, если строка была некорректной

// Сохраняем в JSON-файл
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ Готово! Сохранено ${data.length} заданий в файл "${outputFile}"`);
