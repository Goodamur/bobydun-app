document.addEventListener('DOMContentLoaded', function () {
let index = 0;
let score = 0;

const startButton = document.getElementById('start-button');
const loadingScreen = document.getElementById('loading-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const dialogText = document.getElementById('dialog-text');
const nextDialog = document.getElementById('next-dialog');
const startTestButton = document.getElementById('start-test');
const questionText = document.getElementById('question-text');
const answersDiv = document.getElementById('answers');
const resultText = document.getElementById('result-text');
const dialogBox = document.getElementById('dialog-box');
const startCourseButton = document.getElementById('start-course');
const loadingText = document.getElementById('loading-text');

  // 🔸 Показ кнопки "Начать" через 3 секунды
setTimeout(() => {
  startButton.classList.remove('hidden-button');
  startButton.classList.add('show-button');
  loadingText.classList.add('hidden');
}, 3000);
  
 startButton.onclick = () => {
    startButton.disabled = true; // блокируем повторное нажатие

  // Визуальный эффект
  startButton.classList.add('pressed');
   
  // Запуск музыки
setTimeout(() => {
  bgMusic.play().catch((err) => {
    console.error("Ошибка воспроизведения музыки:", err);
  });

  // Переключение экранов
  loadingScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');

  // Запуск первого диалога
  showDialog();
  }, 150); // Задержка 150 мс
};
  
const dialogMessages = [
  "Привет! Рад тебя видеть.",
  "Меня зовут Bob Dun, но можно просто Boby",
  "Я буду твоим помощником и гидом в мире криптовалют.",
  "Со мной ты научишься безопасно инвестировать и торговать.",
  "Нажми кнопку 'Поехали', если хочешь узнать все секреты",
  "КРУТО! Ты молодец 💥",
  "Рад, что ты готов к исследованиям!",
  "А сейчас я задам тебе пару вопросов, чтобы понять твой уровень.",
  "Всего будет несколько тестовых вопросов, которые помогут определить с чего нам начать.",
  "Готов? Жми 'Пройти тест'!"
];

const resultDialogs = {
  low: ["Ты только начинаешь.\nЭто отлично!", "Рекомендую начать\nс курса «Основы крипты».", "Но ты можешь\nвыбрать любую тему!"],
  mid: ["Уже кое-что знаешь!", "Советую пройти\nкурс по безопасности.", "Но ты можешь\nвыбрать любой сам!"],
  high: ["Ты явно в теме! 🔥", "Советую сразу идти\nв технический анализ!", "Но ты волен\nвыбрать любой курс!"]
};
  
function showDialog() {
  const fullText = dialogMessages[index];
  const words = fullText.split(' ');
  const lines = [];

  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3).join(' '));
  }

  const target = document.getElementById('dialog-text');
  const nextDialog = document.getElementById('next-dialog');
  const startTestButton = document.getElementById('start-test');
  const carButton = document.getElementById('car-button');

  target.innerHTML = '';
  nextDialog.classList.remove('show');
  startTestButton.classList.add('hidden');
  carButton.classList.add('hidden');

  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = lines[lineIndex];

  // Расчёт времени показа "Далее"
  const totalDuration = lines.reduce((sum, line) => sum + line.length * 50 + 300, 0);
  const safeDelay = Math.max(totalDuration - 1000, 0);

  // Показываем кнопку "Далее", если это не последний диалог
  if (index !== dialogMessages.length - 1) {
    setTimeout(() => {
      nextDialog.classList.add('show');
    }, safeDelay);
  }

  // Показ кнопки машинки, если это финальная фраза
  const showCarButton =
    index === dialogMessages.length - 1 &&
    fullText.includes("Жми 'Поехали'");

  const interval = setInterval(() => {
    if (charIndex < currentLine.length) {
      target.innerHTML += currentLine[charIndex];
      charIndex++;
    } else {
      target.innerHTML += '<br>';
      lineIndex++;
      if (lineIndex < lines.length) {
        currentLine = lines[lineIndex];
        charIndex = 0;
      } else {
        clearInterval(interval);

        if (showCarButton) {
          nextDialog.classList.add('hidden');
         if (showCarButton) {
  nextDialog.classList.add('hidden');

  // Показываем кнопку машинки
  carButton.classList.remove('hidden');

  // Назначаем анимацию при нажатии
  carButton.onclick = () => {
    // Прячем кнопку
    carButton.classList.add('hidden');

    // Создаём машинку
    const carImage = document.createElement('img');
    carImage.src = 'media/car.png';
    carImage.className = 'car-image';

    // Помещаем в то же место, где была кнопка
    carButton.parentElement.appendChild(carImage);

    // После завершения анимации — переход к следующему экрану
    carImage.addEventListener('animationend', () => {
      document.getElementById('welcome-screen').classList.add('hidden');
      document.getElementById('test-screen').classList.remove('hidden');
      index = 0;
      showQuestion();
    });
  };
}
        } else if (index === dialogMessages.length - 1) {
          // Альтернатива: если это просто финал
          startTestButton.classList.remove('hidden');
        }
      }
    }
  }, 50);
}

  // Анимация появления каждой строки диалога с задержкой в 0.8 секунды.
  // function showDialog() {
  // const text = dialogMessages[index];
  // const words = text.split(" ");
  // const lines = [];

  // for (let i = 0; i < words.length; i += 3) {
  // lines.push(words.slice(i, i + 3).join(" "));
  // }

  // dialogText.innerHTML = ''; // очистка

  // lines.forEach((line, i) => {
  // const span = document.createElement("span");
  // span.textContent = line;
  // span.className = "dialog-line";
  // span.style.animationDelay = `${i * 0.8}s`;
  // dialogText.appendChild(span);
  // });

  // if (index === dialogMessages.length - 1) {
  // nextDialog.classList.add('hidden');
  // startTestButton.classList.remove('hidden');
  // }
  // }

const bgMusic = new Audio('media/music.mp3');
bgMusic.loop = true;

nextDialog.onclick = () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(e => console.log("⛔️ Музыка не запущена автоматически"));
  }

  index++;
  if (index < dialogMessages.length) {
    showDialog();
  }
};

function showQuestion() {
  const q = questions[index];
  questionText.textContent = q.text;
  answersDiv.innerHTML = '';

  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.className = 'answer';
    btn.onclick = () => {
      // Добавление аудио-эффектов
      const sound = new Audio(answer.correct ? 'media/correct.mp3' : 'media/wrong.mp3');
      sound.play();

      const feedback = document.createElement('span');
      feedback.textContent = answer.correct ? '✅' : '❌';
      btn.appendChild(feedback);

      score += answer.score;
      document.querySelectorAll('.answer').forEach(b => b.disabled = true);

      setTimeout(() => {
        index++;
        if (index >= questions.length) {
          showResult();
        } else {
          showQuestion();
        }
      }, 1200);
    };

    answersDiv.appendChild(btn);
  });
}

function showResult() {
  testScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  // Смена фона на экране результатов
  resultScreen.style.backgroundImage = "url('media/congrats-bg.jpg')";

  let level = '';
  let dialogBlock = [];

  if (score <= 7) {
    level = "Новичок";
    dialogBlock = resultDialogs.low;
  } else if (score <= 15) {
    level = "Осознанный";
    dialogBlock = resultDialogs.mid;
  } else {
    level = "Гений крипты";
    dialogBlock = resultDialogs.high;
  }

  resultText.textContent = `Ты набрал ${score} баллов. ${level}`;
  
  // Отображение тучки (bubble) с диалогами
  dialogBox.innerHTML = dialogBlock.map(dialog => `<p class="dialog-bubble">${dialog}</p>`).join('');
}

startTestButton.onclick = () => {
  welcomeScreen.classList.add('hidden');
  testScreen.classList.remove('hidden');
  index = 0;
  showQuestion();
};

// setTimeout(() => {
//   loadingScreen.classList.add('hidden');
//   welcomeScreen.classList.remove('hidden');
//   showDialog();
// }, 4000);


startCourseButton.onclick = () => {
  alert('Переход к обучению...');
};
  
// Закрытие функции DOMContentLoaded
});

