 // Объявляем переменные глобально
let currentLanguage = 'ru';
let index = 0;
let score = 0;
let dialogMessages = [];
let bgMusic;
let dialogInterval = null;

let startButton, loadingScreen, languageScreen, welcomeScreen, dialogScreen, testScreen, resultScreen;
let dialogText, nextDialog, prevDialogButton, skipDialogButton, startTestButton, questionText, resultDialogBox, answersDiv, resultText, dialogBox, startCourseButton, carButton, muteButton, muteIcon;


 function init() {
  // Получаем все нужные элементы
  startButton = document.getElementById('start-button');
  loadingScreen = document.getElementById('loading-screen');
  languageScreen = document.getElementById('language-screen');
  welcomeScreen = document.getElementById('welcome-screen');
  dialogScreen = document.getElementById('dialog-screen');
  testScreen = document.getElementById('test-screen');
  resultScreen = document.getElementById('result-screen');
  dialogText = document.getElementById('dialog-text');
  skipDialogButton = document.getElementById('skip-dialog');
  prevDialogButton = document.getElementById('prev-dialog');
  nextDialog = document.getElementById('next-dialog');
  startTestButton = document.getElementById('start-test');
  questionText = document.getElementById('question-text');
  answersDiv = document.getElementById('answers');
  resultText = document.getElementById('result-text');
  resultDialogBox = document.getElementById('result-dialog-box');
  dialogBox = document.getElementById('dialog-box');
  startCourseButton = document.getElementById('start-course');
  carButton = document.getElementById('car-button');
  muteButton = document.getElementById('mute-button');
  muteIcon = document.getElementById('mute-icon');

  // Музыка
  bgMusic = new Audio('media/music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

  // Показываем кнопку Start через 3 секунды
  setTimeout(() => {
    if (startButton) {
      startButton.classList.remove('hidden-button');
      startButton.classList.add('show-button');
    }
    let loadingText = document.getElementById('loading-text');
    if (loadingText) loadingText.classList.add('hidden');
  }, 3000);

  // Кнопка Start
  if (startButton) {
    startButton.onclick = () => {
      startButton.disabled = true;
      startButton.classList.add('pressed');
      bgMusic.play().catch(() => {});
      // Показываем только экран выбора языка
      loadingScreen.classList.add('hidden');
      languageScreen.classList.remove('hidden');
      languageScreen.classList.add('slide-in');
    };
  }

  // Обработчик mute
  if (muteButton) {
    muteButton.onclick = () => {
      bgMusic.muted = !bgMusic.muted;
      muteIcon.src = bgMusic.muted ? 'media/sound-off.png' : 'media/sound-on.png';
    };
  }

  // Язык: сбрасываем index и score при выборе
  document.querySelectorAll('.language-button').forEach(button => {
    button.onclick = () => {
      setLanguage(button.dataset.lang);
      index = 0; score = 0;
      transitionToWelcomeScreen();
    };
  });

  // Кнопка "Далее" в диалоге
  if (nextDialog) {
    nextDialog.onclick = () => {
      index++;
      if (index < dialogMessages.length) showDialog();
    };
  }

  // Кнопка "Назад" в диалоге
  if (prevDialogButton) {
  prevDialogButton.onclick = () => {
    // Возвращаемся на предыдущий диалог, если это возможно
    if (index > 0) {
      index--;
      showDialog();
    }
  };
}
  
// Кнопка "Пропустить" в диалоге
if (skipDialogButton) {
  skipDialogButton.onclick = () => {
    // Скрываем кнопку "Пропустить"
    skipDialogButton.style.display = "none";
    // Находим нужную фразу и продолжаем диалог
    const skipText = translations[currentLanguage].introAfterSkip;
    index = dialogMessages.findIndex(msg => msg.trim() === skipText.trim());
    if (index === -1) index = dialogMessages.length - 1;
    showDialog();
  };
 }
}

document.addEventListener('DOMContentLoaded', init);

// Меняем язык
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  let translation = translations[lang];
  dialogMessages = translation.dialogMessages || [];
  resultDialogs = translation.resultDialogs || {};
  updateTextContent();
  // если тест сейчас открыт — обнови вопрос на нужном языке
  if (!testScreen.classList.contains('hidden')) {
    showQuestion();
  }
  // если открыт resultScreen — тоже можно обновить результат
  if (!resultScreen.classList.contains('hidden')) {
    showResult();
  }
  // если открыт welcomeScreen и кнопка "Начать тест" уже показана — обнови её картинку
 if (!welcomeScreen.classList.contains('hidden')) {
  updateStartTestButtonImage();
 }
}

// Обновление текста
function updateTextContent() {
  let translation = translations[currentLanguage];
  // Если welcome-text есть, очищаем его (или вовсе не трогаем)
  let welcomeEl = document.getElementById('welcome-text');
  if (welcomeEl) welcomeEl.textContent = '';
  let nextDialogBtn = document.getElementById('next-dialog');
  if (nextDialogBtn && translation.nextButton) {
    nextDialogBtn.textContent = translation.nextButton;
  }
  let prevDialogBtn = document.getElementById('prev-dialog');
  if (prevDialogBtn && translation.backButton) {
    prevDialogBtn.textContent = translation.backButton;
  }
  let skipDialogBtn = document.getElementById('skip-dialog');
  if (skipDialogBtn && translation.skip) {
    skipDialogBtn.textContent = translation.skip;
  }
  // Остальная локализация
  document.getElementById('language-title').textContent = translation.chooseLanguage || 'Выберите язык';
}

// Переход на экран приветствия
function transitionToWelcomeScreen() {
  languageScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
  welcomeScreen.classList.add('slide-in');
  welcomeScreen.addEventListener('animationend', () => {
    welcomeScreen.classList.remove('slide-in');
    showDialog();
  }, { once: true });
}

function updateStartTestButtonImage() {
  if (!startTestButton) return;
  let img = startTestButton.querySelector('img');
  if (!img) return;
  let imgSrc = 'media/startTestButton.png';
  let imgAlt = 'Начать тест';
  if (currentLanguage === 'en') {
    imgSrc = 'media/startTestButton(En).png';
    imgAlt = "Start Test";
  } else if (currentLanguage === 'ua') {
    imgSrc = 'media/startTestButton(Ua).png';
    imgAlt = "Почати тест";
  }
  img.onload = () => {
    startTestButton.classList.remove('hidden');
    startTestButton.onclick = () => {
      welcomeScreen.classList.add('blur-out');
      setTimeout(() => {
        transitionToTestScreen();
      }, 500);
    };
  };
  img.src = imgSrc;
  img.alt = imgAlt;
  if (img.complete) {
    startTestButton.classList.remove('hidden');
    startTestButton.onclick = () => {
      welcomeScreen.classList.add('blur-out');
      setTimeout(() => {
        transitionToTestScreen();
      }, 500);
    };
  }
}

// Показ диалога
function showDialog() {
  if (dialogInterval) {
    clearInterval(dialogInterval);
    dialogInterval = null;
  }
  let fullText = dialogMessages[index];
  if (!fullText) return;

  let words = fullText.split(' ');
  let lines = [];
  for (let i = 0; i < words.length; i += 3)
    lines.push(words.slice(i, i + 3).join(' '));
  dialogText.innerHTML = '';
  nextDialog.classList.remove('show');
  carButton.classList.add('hidden');

  let lineIndex = 0, charIndex = 0;
  let displayLines = Array(lines.length).fill(''); // Массив для постепенного вывода строк

  function renderText() {
    // Формируем html из массива строк, разделяя <br>
    dialogText.innerHTML = displayLines.map(line => line).join('<br>');
  }

  dialogInterval = setInterval(() => {
    if (lineIndex < lines.length) {
      if (charIndex < lines[lineIndex].length) {
        displayLines[lineIndex] += lines[lineIndex][charIndex];
        charIndex++;
        renderText();
      } else {
        lineIndex++;
        charIndex = 0;
      }
    } else {
      clearInterval(dialogInterval);
      dialogInterval = null;
      // ... остальной код, как раньше
      const trigger = translations[currentLanguage].carButtonTrigger;
      if (fullText.includes(trigger)) {
        nextDialog.classList.remove('show');
        carButton.classList.remove('hidden');
        carButton.innerHTML = ''; // Очистим кнопку
        let carButtonImgSrc = "media/carButton.png";
        if (currentLanguage === "en") carButtonImgSrc = "media/carButton(En).png";
        if (currentLanguage === "ua") carButtonImgSrc = "media/carButton(Ua).png";
        const carImg = document.createElement('img');
        carImg.src = carButtonImgSrc;
        carImg.alt = trigger;
        carButton.appendChild(carImg);
        carButton.onclick = () => {
          carButton.innerHTML = '';
          carButton.style.background = 'none';
          carButton.style.border = 'none';
          const carImage = document.createElement('img');
          carImage.src = 'media/car.png';
          carImage.alt = 'car';
          carImage.className = 'car-animation';
          carButton.appendChild(carImage);
          carImage.addEventListener('animationend', () => {
            changeBackgroundAndCharacter();
            index++;
            if (index < dialogMessages.length) showDialog();
          }, { once: true });
        };
      } else if (index === dialogMessages.length - 1) {
        updateStartTestButtonImage();
      } else {
        nextDialog.classList.add('show');
       let prevDialogButton = document.getElementById('prev-dialog');
        if (prevDialogButton) {
          if (index > 0) {
            prevDialogButton.classList.add('show');
            prevDialogButton.disabled = false;
          } else {
            prevDialogButton.classList.remove('show');
            prevDialogButton.disabled = true;
          }
        }
      }
    }
  }, 50);
}

function transitionToTestScreen() {
  index = 0;          // всегда начинаем тест с первого вопроса!
  score = 0;          // сбрасываем очки
  welcomeScreen.classList.add('hidden');
  testScreen.classList.remove('hidden');
  showQuestion();
}

// Показ вопросов
function showQuestion() {
  const q = questions[index];
  questionText.textContent = q.text[currentLanguage]; // исправлено!
  answersDiv.innerHTML = '';
  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text[currentLanguage]; // исправлено!
    btn.className = 'answer';
    btn.onclick = () => {
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
  let translation = translations[currentLanguage];
  let levelKey = '';
  if (score <= 5) {
    levelKey = "new";
  } else if (score <= 10) {
    levelKey = "low";
  } else if (score <= 15) {
    levelKey = "mid";
  } else {
    levelKey = "high";
  }

  // Текст с результатом (баллы + уровень)
  let scoreText = translation.resultScoreText.replace("{score}", score);

  // Показываем очки и уровень (если хочешь уровень — добавь: + translation.resultLevels[levelKey])
  resultText.textContent = scoreText + " " + translation.resultLevels[levelKey];

  // Показываем диалоги на нужном языке
  // (dialogBox — это твой контейнер в разметке для resultDialogs)
  resultDialogBox.innerHTML = translation.resultDialogs[levelKey]
  .map(dialog => `<p class="dialog-bubble">${dialog}</p>`)
  .join('');
}

// Фон и персонаж
function changeBackgroundAndCharacter() {
  const screen = welcomeScreen;
  const character = document.querySelector('.character');
  if (screen && character) {
    screen.classList.add('blur-out');
    character.classList.add('blur-out');
    setTimeout(() => {
      screen.style.backgroundImage = "url('media/background2.jpg')";
      screen.style.backgroundSize = "cover";
      screen.style.backgroundPosition = "center";
      character.src = 'media/character_class.png';
      screen.classList.remove('blur-out');
      character.classList.remove('blur-out');
      screen.classList.add('blur-in');
      character.classList.add('blur-in');
    }, 500);
  }
}
