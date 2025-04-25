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
  const carButton = document.getElementById('car-button');
  const muteButton = document.getElementById('mute-button');
  const muteIcon = document.getElementById('mute-icon');
  const bgMusic = new Audio('media/music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

muteButton.onclick = () => {
  if (bgMusic.muted) {
    bgMusic.muted = false;
    muteIcon.src = 'media/sound-on.png';
  } else {
    bgMusic.muted = true;
    muteIcon.src = 'media/sound-off.png';
  }
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
    new: ["Ты только начинаешь.\nЭто отлично!", "Рекомендую начать\nс курса «Базовые понятия».", "Но ты можешь\nвыбрать любую тему!"],
    low: ["Не плохо!\nТы уже кое-что знаешь!", "Рекомендую начать\nс курса «Основы крипты».", "Но ты можешь\nвыбрать любую тему!"],
    mid: ["Почти профи! Круто!", "Советую пройти\n курс «Торговля и инвестиции».", "Но ты можешь\nвыбрать любой сам!"],
    high: ["Ты явно в теме! 🔥", "Советую  начать с\n курса «Технический анализ»", "Но ты волен\nвыбрать любой курс!"]
  };

  setTimeout(() => {
    startButton.classList.remove('hidden-button');
    startButton.classList.add('show-button');
    loadingText.classList.add('hidden');
  }, 3000);

  startButton.onclick = () => {
    startButton.disabled = true;
    startButton.classList.add('pressed');
    setTimeout(() => {
      bgMusic.play().catch((err) => console.error("Ошибка воспроизведения музыки:", err));
      loadingScreen.classList.add('hidden');
      welcomeScreen.classList.remove('hidden');
      showDialog();
    }, 150);
  };

 function showDialog() {
  const fullText = dialogMessages[index];
  const words = fullText.split(' ');
  const lines = [];
  for (let i = 0; i < words.length; i += 3) {
    lines.push(words.slice(i, i + 3).join(' '));
  }
  dialogText.innerHTML = '';
  nextDialog.classList.remove('show');
  startTestButton.classList.add('hidden');
  carButton.classList.add('hidden');
  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = lines[lineIndex];

  const interval = setInterval(() => {
    if (charIndex < currentLine.length) {
      dialogText.innerHTML += currentLine[charIndex];
      charIndex++;
    } else {
      dialogText.innerHTML += '<br>';
      lineIndex++;
      if (lineIndex < lines.length) {
        currentLine = lines[lineIndex];
        charIndex = 0;
      } else {
        clearInterval(interval);

        // Проверка на текст "Нажми кнопку 'Поехали', если хочешь узнать все секреты"
        if (fullText.includes("Нажми кнопку 'Поехали', если хочешь узнать все секреты")) {
          // Скрыть кнопку "Далее"
          nextDialog.classList.remove('show');
          // Показать кнопку "Поехали"
          carButton.classList.remove('hidden');
         carButton.onclick = () => {
  // Скрываем текст кнопки
  carButton.innerHTML = '';
  carButton.style.background = 'none'; // Убираем фон кнопки
  carButton.style.border = 'none'; // Убираем рамку кнопки

  // Добавляем изображение машины
  const carImage = document.createElement('img');
  carImage.src = 'media/car.png';
  carImage.alt = 'car';
  carImage.className = 'car-animation'; // Применяем анимацию
  carButton.appendChild(carImage);

  // Добавляем обработчик окончания анимации
  carImage.addEventListener('animationend', () => {
    // Удаляем машину и кнопку
    carButton.style.display = 'none';

    // Переходим к следующему диалогу
    index++;
    if (index < dialogMessages.length) {
      showDialog();
    }
  }, { once: true });
};
        } else if (index === dialogMessages.length - 1) {
          // Если это последний диалог, показываем кнопку "Начать тест"
          startTestButton.classList.remove('hidden');
        } else {
          // Для остальных диалогов показываем кнопку "Далее"
          nextDialog.classList.add('show');
        }
      }
    }
  }, 50);

  nextDialog.onclick = () => {
    index++;
    if (index < dialogMessages.length) {
      showDialog();
    }
  };
}

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
    let level = '';
    let dialogBlock = [];
    if (score <= 5) {
      level = "Новичок";
      dialogBlock = resultDialogs.new;
    } else if (score <= 10) {
      level = "Уверенный пользователь";
      dialogBlock = resultDialogs.low;
    } else if (score <= 15) {
      level = "Осознанный";
      dialogBlock = resultDialogs.mid;
    } else {
      level = "Гений крипты";
      dialogBlock = resultDialogs.high;
    }
    resultText.textContent = `Ты набрал ${score} баллов. ${level}`;
    dialogBox.innerHTML = dialogBlock.map(dialog => `<p class="dialog-bubble">${dialog}</p>`).join('');
  }

  startTestButton.onclick = () => {
    welcomeScreen.classList.add('hidden');
    testScreen.classList.remove('hidden');
    index = 0;
    showQuestion();
  };

  startCourseButton.onclick = () => {
    alert('Переход к обучению...');
  };
});
