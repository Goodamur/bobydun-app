 // Объявляем переменные глобально
let currentLanguage = 'ru';
let index = 0;
let score = 0;
let dialogMessages = [];
let resultDialogs = {};
let bgMusic;

let startButton, loadingScreen, languageScreen, welcomeScreen, testScreen, resultScreen;
let dialogText, nextDialog, startTestButton, questionText, answersDiv, resultText, dialogBox, startCourseButton, carButton, muteButton, muteIcon;


 function init() {
  // Получаем все нужные элементы
  startButton = document.getElementById('start-button');
  loadingScreen = document.getElementById('loading-screen');
  languageScreen = document.getElementById('language-screen');
  welcomeScreen = document.getElementById('welcome-screen');
  testScreen = document.getElementById('test-screen');
  resultScreen = document.getElementById('result-screen');
  dialogText = document.getElementById('dialog-text');
  nextDialog = document.getElementById('next-dialog');
  startTestButton = document.getElementById('start-test');
  questionText = document.getElementById('question-text');
  answersDiv = document.getElementById('answers');
  resultText = document.getElementById('result-text');
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

  // Кнопка "Начать тест"
  if (startTestButton) {
    startTestButton.onclick = () => {
      welcomeScreen.classList.add('blur-out');
      setTimeout(() => {
        transitionToTestScreen();
      }, 500);
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
}

// Обновление текста
function updateTextContent() {
  let translation = translations[currentLanguage];
  // Если welcome-text есть, очищаем его (или вовсе не трогаем)
  let welcomeEl = document.getElementById('welcome-text');
  if (welcomeEl) welcomeEl.textContent = '';
  // Остальная локализация
  document.getElementById('language-title').textContent = translation.chooseLanguage || 'Выберите язык';
  if (startTestButton) startTestButton.textContent = translation.startTest || 'Начать тест';
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

// Показ диалога
function showDialog() {
  let fullText = dialogMessages[index];
  if (!fullText) return;
  let words = fullText.split(' ');
  let lines = [];
  for (let i = 0; i < words.length; i += 3) lines.push(words.slice(i, i + 3).join(' '));
  dialogText.innerHTML = '';
  nextDialog.classList.remove('show');
  startTestButton.classList.add('hidden');
  carButton.classList.add('hidden');
  let lineIndex = 0, charIndex = 0, currentLine = lines[lineIndex];
  const interval = setInterval(() => {
    if (charIndex < currentLine.length) {
      dialogText.innerHTML += currentLine[charIndex];
      charIndex++;
    } else {
      dialogText.innerHTML += '<br>';
      lineIndex++;
      if (lineIndex < lines.length) {
        currentLine = lines[lineIndex]; charIndex = 0;
      } else {
        clearInterval(interval);

        // --- Исправленная проверка ---
        const trigger = translations[currentLanguage].carButtonTrigger;
        if (fullText.includes(trigger)) {
          nextDialog.classList.remove('show');
          carButton.classList.remove('hidden');
          carButton.innerHTML = ''; // Очистим кнопку

          // Выбор картинки по языку
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
          // Вот тут меняем картинку!
          let img = startTestButton.querySelector('img');
          if (img) {
            let imgSrc = 'media/startTestButton.png';
            let imgAlt = 'Начать тест';
            if (currentLanguage === 'en') {
              imgSrc = 'media/startTestButton(En).png';
              imgAlt = "Start Test";
            } else if (currentLanguage === 'ua') {
              imgSrc = 'media/startTestButton(Ua).png';
              imgAlt = "Почати тест";
            }
            img.src = imgSrc;
            img.alt = imgAlt;
          }
          startTestButton.classList.remove('hidden');
        } else {
          nextDialog.classList.add('show');
        }
      }
    }
  }, 50);
}

// Переход к тесту
function transitionToTestScreen() {
  welcomeScreen.classList.add('hidden');
  testScreen.classList.remove('hidden');
  showQuestion();
}

// Показ вопросов
function showQuestion() {
  const q = questions[index];
  questionText.textContent = q.text;
  answersDiv.innerHTML = '';
  q.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
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

// Показ результатов
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
