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
  const bgMusic = new Audio('media/music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.2;

  // Проверка наличия кнопки muteButton
  if (muteButton) {
    muteButton.onclick = () => {
      if (bgMusic.muted) {
        bgMusic.muted = false;
        muteButton.textContent = '🔈';
      } else {
        bgMusic.muted = true;
        muteButton.textContent = '🔇';
      }
    };
  }

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

  const questions = [
    {
      text: "Что такое криптовалюта?",
      answers: [
        { text: "Электронные деньги", correct: true, score: 3 },
        { text: "Физическая валюта", correct: false, score: 0 },
        { text: "Ценные бумаги", correct: false, score: 0 }
      ]
    },
    {
      text: "Какая валюта считается первой криптовалютой?",
      answers: [
        { text: "Ethereum", correct: false, score: 0 },
        { text: "Bitcoin", correct: true, score: 3 },
        { text: "Litecoin", correct: false, score: 0 }
      ]
    }
  ];

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
          if (index === dialogMessages.length - 1) {
            carButton.classList.remove('hidden');
            carButton.onclick = () => {
              carButton.classList.add('animate');
              carButton.addEventListener('animationend', () => {
                carButton.classList.add('hidden');
                welcomeScreen.classList.add('hidden');
                testScreen.classList.remove('hidden');
                index = 0;
                showQuestion();
              }, { once: true });
            };
          } else {
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
        const sound = new Audio(answer.correct ? 'media/correct.mp3' : 'media/wrong.mp3');
        sound.play();
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
