let index = 0;
let score = 0;

const loadingScreen = document.getElementById('loading-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersDiv = document.getElementById('answers');
const resultText = document.getElementById('result-text');
const dialogBox = document.getElementById('dialog-box');
const startCourseButton = document.getElementById('start-course');

const resultDialogs = {
  low: ["Ты только начинаешь.\nЭто отлично!", "Рекомендую начать\nс курса «Основы крипты».", "Но ты можешь\nвыбрать любую тему!"],
  mid: ["Уже кое-что знаешь!", "Советую пройти\nкурс по безопасности.", "Но ты можешь\nвыбрать любой сам!"],
  high: ["Ты явно в теме! 🔥", "Советую сразу идти\nв технический анализ!", "Но ты волен\nвыбрать любой курс!"]
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

setTimeout(() => {
  loadingScreen.classList.add('hidden');
  testScreen.classList.remove('hidden');
  showQuestion();
}, 4000);

startCourseButton.onclick = () => {
  alert('Переход к обучению...');
};