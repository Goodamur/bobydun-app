document.addEventListener('DOMContentLoaded', function () {
  let currentLanguage = 'ru'; // Язык по умолчанию
  let index = 0;
  let score = 0;

  const startButton = document.getElementById('start-button');
  const loadingScreen = document.getElementById('loading-screen');
  const welcomeScreen = document.getElementById('welcome-screen');
  const testScreen = document.getElementById('test-screen');
  const resultScreen = document.getElementById('result-screen');
  const dialogText = document.getElementById('dialog-text');
  const nextDialog = document.getElementById('next-dialog');
  const startTestButton = document.getElementById('start-test'); // Убедитесь, что элемент существует
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

  // Показываем кнопку "Start" через 3 секунды
  setTimeout(() => {
    if (startButton) {
      startButton.classList.remove('hidden-button'); // Убираем скрытие
      startButton.classList.add('show-button'); // Показываем кнопку
    }
    if (loadingText) {
      loadingText.classList.add('hidden'); // Скрываем текст загрузки
    }
  }, 3000);

  // Обновлённый обработчик для кнопки "Start"
  if (startButton) {
    startButton.onclick = () => {
      startButton.disabled = true;
      startButton.classList.add('pressed');

      // Попытка воспроизведения музыки
      bgMusic.play()
        .then(() => {
          console.log("Музыка успешно запущена");
        })
        .catch((err) => {
          console.error("Ошибка воспроизведения музыки:", err);
          alert("Не удалось воспроизвести музыку. Пожалуйста, проверьте настройки браузера.");
        });

      // Добавляем анимацию Slide and Fade для экрана загрузки
      if (loadingScreen) {
        loadingScreen.classList.add('slide-out');
        loadingScreen.addEventListener('animationend', () => {
          loadingScreen.classList.add('hidden');
          loadingScreen.classList.remove('slide-out');

          // Переход к экрану выбора языка
          const languageScreen = document.getElementById('language-screen');
          if (languageScreen) {
            languageScreen.classList.remove('hidden');
            languageScreen.classList.add('slide-in');
          }
        }, { once: true });
      }
    };
  }

  // Обработчик кнопки "Mute"
  if (muteButton) {
    muteButton.onclick = () => {
      bgMusic.muted = !bgMusic.muted;
      muteIcon.src = bgMusic.muted ? 'media/sound-off.png' : 'media/sound-on.png';
    };
  }

  // Обработчик для кнопки "Начать тест"
 if (startTestButton) {
  startTestButton.onclick = () => {
    console.log("Кнопка 'Начать тест' нажата");

    // Добавляем анимацию размытия для экрана приветствия
    welcomeScreen.classList.add('blur-out');
    console.log("Анимация 'blur-out' добавлена для welcomeScreen");

    // Резервный таймер для завершения анимации в случае сбоя
    const animationTimeout = setTimeout(() => {
      console.log("Резервный таймер: Анимация 'blur-out' завершена (таймер)");
      transitionToTestScreen();
    }, 500); // Длительность анимации blur-out

    // Ждём завершения анимации размытия
    welcomeScreen.addEventListener(
      'animationend',
      function handleBlurOut() {
        console.log("Анимация 'blur-out' завершена (событие)");
        clearTimeout(animationTimeout); // Очищаем резервный таймер
        transitionToTestScreen();

        // Убираем слушатель анимации, чтобы избежать дублирования
        welcomeScreen.removeEventListener('animationend', handleBlurOut);
      },
      { once: true }
    );
  };
} else {
  console.error("Элемент с id 'start-test' не найден в DOM!");
}
  
  // Функция для изменения языка
  function setLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Переводы для языка ${lang} не найдены!`);
      return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang); // Сохраняем выбор в localStorage
    updateTextContent(); // Обновляем текст на экране
  }

  // Функция обновления текста на экране
  function updateTextContent() {
    const translation = translations[currentLanguage];
    if (!translation) {
      console.error(`Переводы для языка ${currentLanguage} не найдены!`);
      return;
    }

    const welcomeText = document.getElementById('welcome-text');
    const startTest = document.getElementById('start-test');
    const languageTitle = document.getElementById('language-title');

    if (welcomeText) {
      welcomeText.textContent = translation.welcome || 'Добро пожаловать!';
    }

    if (startTest) {
      startTest.textContent = translation.startTest || 'Начать тест';
    }

    if (languageTitle) {
      languageTitle.textContent = translation.chooseLanguage || 'Выберите язык';
    }

    if (typeof dialogMessages !== 'undefined') {
      dialogMessages = translation.dialogMessages || [];
    }
  }
});

// Функция перехода на экран приветствия
function transitionToWelcomeScreen() {
  const languageScreen = document.getElementById('language-screen');
  if (!languageScreen) {
    console.error("Элемент 'language-screen' не найден!");
    return;
  }

  languageScreen.classList.add('hidden');

  // Переход к экрану приветствия
  if (welcomeScreen) {
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.classList.add('slide-in');
    welcomeScreen.addEventListener(
      'animationend',
      () => {
        welcomeScreen.classList.remove('slide-in');
        showDialog(); // Показываем первый диалог
      },
      { once: true }
    );
  } else {
    console.error("Элемент 'welcome-screen' не найден!");
  }
}
  
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
              // После завершения анимации меняем фон и персонажа
              changeBackgroundAndCharacter();

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

// Функция для смены фона и персонажа
function changeBackgroundAndCharacter() {
  console.log("Смена фона и персонажа (размытие)"); // Для отладки

  const screen = document.getElementById('welcome-screen'); // Выбираем конкретный экран
  const character = document.querySelector('.character'); // Находим персонажа

  if (screen && character) {
    // Добавляем класс для размытия и исчезновения
    screen.classList.add('blur-out');
    character.classList.add('blur-out');

    // Ждём завершения анимации размытия
    setTimeout(() => {
      // Меняем фон
      screen.style.backgroundImage = "url('media/background2.jpg')";
      screen.style.backgroundSize = "cover";
      screen.style.backgroundPosition = "center";

      // Меняем персонажа
      character.src = 'media/character_class.png';

      // Убираем класс размытия и добавляем класс появления
      screen.classList.remove('blur-out');
      character.classList.remove('blur-out');
      screen.classList.add('blur-in');
      character.classList.add('blur-in');
    }, 500); // Время совпадает с длительностью анимации blurOut
  } else {
    console.error("Элемент '#welcome-screen' или '.character' не найден!");
  }
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
  console.log("Кнопка 'Начать тест' нажата");

  // Добавляем анимацию размытия для экрана приветствия
  welcomeScreen.classList.add('blur-out');
  console.log("Анимация 'blur-out' добавлена для welcomeScreen");

  // Резервный таймер для завершения анимации в случае сбоя
  const animationTimeout = setTimeout(() => {
    console.log("Резервный таймер: Анимация 'blur-out' завершена (таймер)");
    transitionToTestScreen();
  }, 500); // Длительность анимации blur-out

  // Ждём завершения анимации размытия
  welcomeScreen.addEventListener(
    'animationend',
    function handleBlurOut() {
      console.log("Анимация 'blur-out' завершена (событие)");
      clearTimeout(animationTimeout); // Очищаем резервный таймер
      transitionToTestScreen();

      // Убираем слушатель анимации, чтобы избежать дублирования
      welcomeScreen.removeEventListener('animationend', handleBlurOut);
    },
    { once: true }
  );

  function transitionToTestScreen() {
    // Скрываем экран приветствия
    welcomeScreen.classList.add('hidden');
    welcomeScreen.classList.remove('blur-out');
    console.log("Экран приветствия скрыт");

    // Показываем экран теста с анимацией появления
    testScreen.classList.remove('hidden');
    testScreen.classList.add('blur-in');
    console.log("Экран теста показан с анимацией 'blur-in'");

    // Убираем класс анимации после завершения
    testScreen.addEventListener(
      'animationend',
      function handleBlurIn() {
        testScreen.classList.remove('blur-in');
        console.log("Класс 'blur-in' удалён с экрана теста");
      },
      { once: true }
    );

    // Сбрасываем индекс и показываем первый вопрос
    if (typeof questions !== 'undefined' && questions.length > 0) {
      index = 0;
      console.log("Индекс вопросов сброшен, вызывается showQuestion()");
      showQuestion();
    } else {
      console.error("Массив 'questions' не определён или пустой!");
    }
  }
};
  
startCourseButton.onclick = () => {
  alert('Переход к обучению...');
};

