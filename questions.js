const questions = [
  {
    text: "Что такое криптовалюта?",
    answers: [
      { text: "Игровая валюта", score: 0, correct: false },
      { text: "Бумажные деньги", score: 0, correct: false },
      { text: "Цифровая валюта", score: 1, correct: true },
      { text: "Ценные бумаги", score: 0, correct: false }
    ]
  },
  {
    text: "Кто создатель Ethereum?",
    answers: [
      { text: "Илон Маск", score: 0, correct: false },
      { text: "Виталик Бутерин", score: 1, correct: true },
      { text: "Джонни Синс", score: 0, correct: false },
      { text: "CZ Binance", score: 0, correct: false }
    ]
  },
    {
    text: "Что правильно написано про децентрализованную систему?",
    answers: [
      { text: "Система управления одним органом", score: 0, correct: false },
      { text: "Система быстрых фиатных переводов", score: 0, correct: false },
      { text: "Система работающая без интернета", score: 0, correct: false },
      { text: "Система управления сетью пользователей", score: 1, correct: true }
    ]
  },
  {
    text: "Что такое блокчейн?",
    answers: [
      { text: "Журнал записей про движение цены активов", score: 0, correct: false },
      { text: "База данных биржи, с открытым доступом", score: 0, correct: false },
      { text: "График роста курса", score: 0, correct: false },
      { text: "Способ хранения и передачи данных в виде цепочки блоков", score: 1, correct: true }
    ]
  },
  {
    text: "Что такое FOMO?",
    answers: [
      { text: "Страх упустить выгоду", score: 1, correct: true },
      { text: "Альткоин", score: 0, correct: false },
      { text: "Тип блокчейна", score: 0, correct: false },
      { text: "Стратегия торговли", score: 0, correct: false }
    ]
  },
  {
    text: "Что такое сид-фраза?",
    answers: [
      { text: "Кодовое слово для покупки", score: 0, correct: false },
      { text: "Кодовые Цифры, для восстановления аккаунта на бирже", score: 0, correct: false },
      { text: "Набор слов, для восстановления кошелька", score: 1, correct: true },
      { text: "Код токена", score: 0, correct: false }
    ]
  },
  {
    text: "Что главное в трейдинге?",
    answers: [
      { text: "Дисциплина", score: 1, correct: true },
      { text: "Знания", score: 0, correct: false },
      { text: "Стратегия", score: 0, correct: false },
      { text: "Отслеживать новости", score: 0, correct: false }
    ]
  },
  {
    text: "Что такое холодное хранение?",
    answers: [
      { text: "Онлайн-кошелёк", score: 0, correct: false },
      { text: "Кошелёк внутри биржы", score: 0, correct: false },
      { text: "Структурное накопление активов", score: 0, correct: false },
      { text: "Оффлайн-кошелёк", score: 1, correct: true }
    ]
  },
  {
    text: "Что НЕ является биржей?",
    answers: [
      { text: "Binance", score: 0, correct: false },
      { text: "ByBetBox", score: 1, correct: true },
      { text: "PancakeSwap", score: 0, correct: false },
      { text: "KuCoin", score: 0, correct: false }
    ]
  },
  {
    text: "Сколько процентов от депозита стоит рисковать в одной сделке?",
    answers: [
      { text: "1-2%", score: 1, correct: true },
      { text: "4-6%", score: 0, correct: false },
      { text: "5-10%", score: 0, correct: false },
      { text: "10-20%", score: 0, correct: false }
    ]
  },
   {
    text: "Что такое свечной график?",
    answers: [
      { text: "Тренд цены", score: 0, correct: false },
      { text: "Открытие, закрытие, максимум, минимум", score: 1, correct: true },
      { text: "Анимация стоимости", score: 0, correct: false },
      { text: "График установки свечей в церкви", score: 0, correct: false }
    ]
  },
  {
    text: "Какие существуют типы ордеров на бирже?",
    answers: [
      { text: "Limit, Market, Stop", score: 1, correct: true },
      { text: "Stop, Buy, Sell", score: 0, correct: false },
      { text: "Market, Block, Deferred", score: 0, correct: false },
      { text: "Limit, Market", score: 0, correct: false }
    ]
 },
   {
    text: "Что такое токеномика?",
    answers: [
      { text: "Наука про токены", score: 0, correct: false },
      { text: "Число NFT", score: 0, correct: false },
      { text: "Способ майнинга", score: 0, correct: false },
      { text: "Экономика токена", score: 1, correct: true }
    ]
  },
  {
    text: "Что такое стейкинг, фарминг и лаунчпулы?",
    answers: [
      { text: "Виды блокчейнов", score: 0, correct: false },
      { text: "Типы торговых терминалов", score: 0, correct: false },
      { text: "Способы пассивного дохода в криптовалюте", score: 1, correct: true },
      { text: "Стили торговли", score: 0, correct: false }
    ]
  },
   {
    text: "Что такое Proof-of-Stake (PoS)?",
    answers: [
      { text: "Программное сопровождение торговли", score: 0, correct: false },
      { text: "Стейкинг новых токенов", score: 0, correct: false },
      { text: "Стейкинг для валидации блоков", score: 1, correct: true },
      { text: "GPU майнинг альткоинов", score: 0, correct: false }
    ]
  },
   {
    text: "Как анализировать ликвидность на бирже?",
    answers: [
      { text: "Смотреть курс BTC", score: 0, correct: false },
      { text: "Смотреть объемы, спреды и глубину стакана", score: 1, correct: true },
      { text: "Следить за резкими разворотами цены", score: 0, correct: false },
      { text: "По отзывам в Google", score: 0, correct: false }
    ]
  },
   {
    text: "Сколько ты изучаешь/торгуе на крипторынке?",
    answers: [
      { text: "Только начал", score: 1, correct: true },
      { text: "До года", score: 2, correct: true },
      { text: "Больше года", score: 3, correct: true },
      { text: "Больше 2-х лет", score: 4, correct: true }
    ]
  }
];
