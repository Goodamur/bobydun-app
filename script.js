document.addEventListener('DOMContentLoaded', function () {
let index = 0;
let score = 0;

const startButton = document.getElementById('start-button');
const loadingScreen = document.getElementById('loading-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const music = new Audio('media/music.mp3');
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
  
  // Обработчик кнопки "Начать"
startButton.onclick = () => {
    // Скрыть экран загрузки и показать экран приветствия
    loadingScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');

    // Воспроизведение музыки
    music.loop = true;
    music.play().catch((err) => {
      console.error("Ошибка воспроизведения музыки:", err);
    });

    // Запускаем диалог только после перехода на экран
  showDialog();
};
  
const dialogMessages = [
  "Привет! Рад видеть тебя здесь.",
  "Меня зовут BobyDun, но можно просто Boby 😉",
  "Я тут для того, чтобы быть твоим помощником и гидом в мире криптовалют.",
  "Со мной ты научишься безопасно инвестировать и торговать 😎",
  "Тыцни кнопку 'Поехали', если готов — и погнали 🚀",
  "КРУТО! Ты молодец 💥",
  "Рад, что ты готов к исследованиям!",
  "А сейчас я задам тебе пару вопросов, чтобы понять твой уровень.",
  "Всего будет несколько тестовых вопросов — не бойся ошибаться 😉",
  "Готов? Жми 'Пройти тест'!"
];

const resultDialogs = {
  low: ["Ты только начинаешь.\nЭто отлично!", "Рекомендую начать\nс курса «Основы крипты».", "Но ты можешь\nвыбрать любую тему!"],
  mid: ["Уже кое-что знаешь!", "Советую пройти\nкурс по безопасности.", "Но ты можешь\nвыбрать любой сам!"],
  high: ["Ты явно в теме! 🔥", "Советую сразу идти\nв технический анализ!", "Но ты волен\nвыбрать любой курс!"]
};

function showDialog() {
  dialogText.textContent = dialogMessages[index];
  if (index === dialogMessages.length - 1) {
    nextDialog.classList.add('hidden');
    startTestButton.classList.remove('hidden');
  }
}

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

  loadingScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
  showDialog(); // запуск первого диалога
};

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

