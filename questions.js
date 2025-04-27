const questions = [
  {
    text: {
      ru: "Что такое криптовалюта?",
      en: "What is cryptocurrency?",
      ua: "Що таке криптовалюта?",
    },
    answers: [
      { text: { ru: "Игровая валюта", en: "Game currency", ua: "Ігрова валюта" } score: 0, correct: false },
      { text: { ru: "Бумажные деньги", en: "Paper money", ua: "Паперові гроші" } score: 0, correct: false },
      { text: { ru: "Цифровая валюта", en: "Digital currency", ua: "Цифрова валюта" } score: 1, correct: true },
      { text: { ru: "Ценные бумаги", en: "Stocks and securities", ua: "Цінні папери" } score: 0, correct: false }
    ]
  },
  {
     text: {
      ru: "Кто создатель Ethereum?",
      en: "Who created Ethereum?",
      ua: "Хто створив Ethereum?",
    },
    answers: [
      { text: { ru: "Илон Маск", en: "Elon Musk", ua: "Ілон Маск" } score: 0, correct: false },
      { text: { ru: "Виталик Бутерин", en: "Vitalik Buterin", ua: "Віталік Бутерін" } score: 1, correct: true },
      { text: { ru: "Джонни Синс", en: "Johnny Sins", ua: "Джонні Сінс" } score: 0, correct: false },
      { text: { ru: "CZ Binance", en: "CZ Binance", ua: "CZ Binance" } score: 0, correct: false }
    ]
  },
    {
    text: {
      ru: "Что правильно написано про децентрализованную систему?",
      en: "What’s true about a decentralized system?",
      ua: "Що вірно про децентралізовану систему?",
    },
    answers: [
      { text: { ru: "Система управления одним органом", en: "Controlled by one authority", ua: "Система, якою керує один орган" } score: 0, correct: false },
      { text: { ru: "Система быстрых фиатных переводов", en: "A system for fast fiat transfers", ua: "Система швидких фіатних переказів" } score: 0, correct: false },
      { text: { ru: "Система работающая без интернета", en: "Works without the Internet", ua: "Система, що працює без інтернету" } score: 0, correct: false },
      { text: { ru: "Система управления сетью пользователей", en: "A network managed by its users", ua: "Система управління мережею користувачів" } score: 1, correct: true }
    ]
  },
  {
    text: {
      ru: "Что такое блокчейн?",
      en: "What is blockchain?",
      ua: "Що таке блокчейн?",
    },
    answers: [
      { text: { ru: "Журнал записей про движение цены активов", en: "A price movement journal", ua: "Журнал записів про рух цін активів" } score: 0, correct: false },
      { text: { ru: "База данных биржи, с открытым доступом", en: "An exchange database with open access", ua: "База даних біржі з відкритим доступом" } score: 0, correct: false },
      { text: { ru: "График роста курса", en: "A price trend graph", ua: "Графік зростання курсу" } score: 0, correct: false },
      { text: { ru: "Способ хранения и передачи данных в виде цепочки блоков", en: "A way of storing and transferring data as a chain of blocks", ua: "Спосіб зберігання та передачі даних у вигляді ланцюжка блоків" } score: 1, correct: true }
    ]
  },
  {
    text: {
      ru: "Что такое FOMO?",
      en: "What is FOMO?",
      ua: "Що таке FOMO?",
    },
    answers: [
      { text: { ru: "Страх упустить выгоду", en: "Fear of missing out", ua: "Страх втратити вигоду" } score: 1, correct: true },
      { text: { ru: "Альткоин", en: "An altcoin", ua: "Альткойн" } score: 0, correct: false },
      { text: { ru: "Тип блокчейна", en: "A blockchain type", ua: "Тип блокчейна" } score: 0, correct: false },
      { text: { ru: "Стратегия торговли", en: "A trading strategy", ua: "Стратегія торгівлі" } score: 0, correct: false }
    ]
  },
  {
    text: {
      ru: "Что такое сид-фраза?",
      en: "What is a seed phrase?",
      ua: "Що таке сид-фраза?",
    },
    answers: [
      { text: { ru: "Кодовое слово для покупки", en: "A password for purchases", ua: "Кодове слово для покупки" } score: 0, correct: false },
      { text: { ru: "Кодовые Цифры, для восстановления аккаунта на бирже", en: "Recovery code for exchange accounts", ua: "Кодові цифри для відновлення акаунту на біржі" } score: 0, correct: false },
      { text: { ru: "Набор слов, для восстановления кошелька", en: "A set of words to recover your wallet", ua: "Набір слів для відновлення гаманця" } score: 1, correct: true },
      { text: { ru: "Код токена", en: "Token code", ua: "Код токена" } score: 0, correct: false }
    ]
  },
  {
    text: {
      ru: "Что главное в трейдинге?",
      en: "What's the most important thing in trading?",
      ua: "Що головне в трейдингу?",
    },
    answers: [
      { text: { ru: "Дисциплина", en: "Discipline", ua: "Дисципліна" } score: 1, correct: true },
      { text: { ru: "Знания", en: "Knowledge", ua: "Знання" } score: 0, correct: false },
      { text: { ru: "Стратегия", en: "Strategy", ua: "Стратегія" } score: 0, correct: false },
      { text: { ru: "Отслеживать новости", en: "Tracking the news", ua: "Слідкувати за новинами" } score: 0, correct: false }
    ]
  },
  {
    text: {
      ru: "Что такое холодное хранение?",
      en: "What is cold storage?",
      ua: "Що таке холодне зберігання?",
    },
    answers: [
      { text: { ru: "Онлайн-кошелёк", en: "An online wallet", ua: "Онлайн-гаманець" } score: 0, correct: false },
      { text: { ru: "Кошелёк внутри биржы", en: "An exchange wallet", ua: "Гаманець всередині біржі" } score: 0, correct: false },
      { text: { ru: "Структурное накопление активов", en: "Structured asset saving", ua: "Структурне накопичення активів" } score: 0, correct: false },
      { text: { ru: "Оффлайн-кошелёк", en: "An offline wallet", ua: "Оффлайн-гаманець" } score: 1, correct: true }
    ]
  },
  {
    text: {
      ru: "Что НЕ является биржей?",
      en: "Which one is NOT an exchange?",
      ua: "Що НЕ є біржею?",
    },
    answers: [
      { text: { ru: "Binance", en: "Binance", ua: "Binance" } score: 0, correct: false },
      { text: { ru: "ByBetBox", en: "ByBetBox", ua: "ByBetBox" } score: 1, correct: true },
      { text: { ru: "PancakeSwap", en: "PancakeSwap", ua: "PancakeSwap" } score: 0, correct: false },
      { text: { ru: "KuCoin", en: "KuCoin", ua: "KuCoin" } score: 0, correct: false }
    ]
  },
  {
    text: {
      ru: "Сколько процентов от депозита стоит рисковать в одной сделке?",
      en: "What % of your deposit should you risk in one trade?",
      ua: "Скільки відсотків від депозиту варто ризикувати в одній угоді?",
    },
    answers: [
      { text: { ru: "1-2%", en: "1-2%", ua: "1-2%" } score: 1, correct: true },
      { text: { ru: "3-5%", en: "3-5%", ua: "3-5%" } score: 0, correct: false },
      { text: { ru: "5-10%", en: "5-10%", ua: "5-10%" } score: 0, correct: false },
      { text: { ru: "10-20%", en: "10-20%", ua: "10-20%" } score: 0, correct: false }
    ]
  },
   {
    text: {
      ru: "Что такое свечной график?",
      en: "What is a candlestick chart?",
      ua: "Що таке свічковий графік?",
    },
    answers: [
      { text: { ru: "Тренд цены", en: "A price trend", ua: "Тренд ціни" } score: 0, correct: false },
      { text: { ru: "Открытие, закрытие, максимум, минимум", en: "Shows open, close, high, and low prices", ua: "Відкриття, закриття, максимум, мінімум" } score: 1, correct: true },
      { text: { ru: "Анимация стоимости", en: "An animated price movement", ua: "Анімація вартості" } score: 0, correct: false },
      { text: { ru: "График установки свечей в церкви", en: "A chart of church candles", ua: "Графік встановлення свічок у церкві" } score: 0, correct: false }
    ]
  },
  {
    text: {
      ru: "Какие существуют типы ордеров на бирже?",
      en: "What are the main types of orders on an exchange?",
      ua: "Які є типи ордерів на біржі?",
    },
    answers: [
      { text: { ru: "Limit, Market, Stop", en: "Limit, Market, Stop", ua: "Limit, Market, Stop" } score: 1, correct: true },
      { text: { ru: "Stop, Buy, Sell", en: "Stop, Buy, Sell", ua: "Stop, Buy, Sell" } score: 0, correct: false },
      { text: { ru: "Market, Block, Deferred", en: "Market, Block, Deferred", ua: "Market, Block, Deferred" } score: 0, correct: false },
      { text: { ru: "Limit, Market", en: "Limit, Market", ua: "Limit, Market" } score: 0, correct: false }
    ]
 },
   {
    text: {
      ru: "Что такое токеномика?",
      en: "What is tokenomics?",
      ua: "Що таке токеноміка?",
    },
    answers: [
      { text: { ru: "Наука про токены", en: "The science of tokens", ua: "Наука про токени" } score: 0, correct: false },
      { text: { ru: "Число NFT", en: "The number of NFTs", ua: "Кількість NFT" } score: 0, correct: false },
      { text: { ru: "Способ майнинга", en: "A mining method", ua: "Спосіб майнінгу" } score: 0, correct: false },
      { text: { ru: "Экономика токена", en: "The economics of a token", ua: "Економіка токена" } score: 1, correct: true }
    ]
  },
  {
    text: {
      ru: "Что такое стейкинг, фарминг и лаунчпулы?",
      en: "What are staking, farming, and launchpools?",
      ua: "Що таке стейкінг, фармінг і лаунчпули?",
    },
    answers: [
      { text: { ru: "Виды блокчейнов", en: "Types of blockchains", ua: "Типи блокчейнів" } score: 0, correct: false },
      { text: { ru: "Типы торговых терминалов", en: "Trading terminal types", ua: "Типи торгових терміналів" } score: 0, correct: false },
      { text: { ru: "Способы пассивного дохода в криптовалюте", en: "Ways to earn passive income with crypto", ua: "Способи пасивного доходу в крипті" } score: 1, correct: true },
      { text: { ru: "Стили торговли", en: "Trading styles", ua: "Стилі торгівлі" } score: 0, correct: false }
    ]
  },
   {
    text: {
      ru: "Что такое Proof-of-Stake (PoS)?",
      en: "What is Proof-of-Stake (PoS)?",
      ua: "Що таке Proof-of-Stake (PoS)?",
    },
    answers: [
      { text: { ru: "Программное сопровождение торговли", en: "Trading support software", ua: "Програмне супроводження торгівлі" } score: 0, correct: false },
      { text: { ru: "Стейкинг новых токенов", en: "Staking new tokens", ua: "Стейкінг нових токенів" } score: 0, correct: false },
      { text: { ru: "Стейкинг для валидации блоков", en: "Staking to validate blockchain blocks", ua: "Стейкінг для валідації блоків" } score: 1, correct: true },
      { text: { ru: "GPU майнинг альткоинов", en: "GPU mining of altcoins", ua: "GPU майнінг альткойнів" } score: 0, correct: false }
    ]
  },
   {
    text: {
      ru: "Как анализировать ликвидность на бирже?",
      en: "How do you analyze liquidity on an exchange?",
      ua: "Як аналізувати ліквідність на біржі?",
    },
    answers: [
      { text: { ru: "Смотреть курс BTC", en: "Watch the BTC price", ua: "Дивитись курс BTC" } score: 0, correct: false },
      { text: { ru: "Смотреть объемы, спреды и глубину стакана", en: "Look at volumes, spreads, and order book depth", ua: "Дивитись обсяги, спреди і глибину стакану" } score: 1, correct: true },
      { text: { ru: "Следить за резкими разворотами цены", en: "Track sudden price reversals", ua: "Слідкувати за різкими розворотами ціни" } score: 0, correct: false },
      { text: { ru: "По отзывам в Google", en: "Check Google reviews", ua: "За відгуками в Google" } score: 0, correct: false }
    ]
  },
   {
    text: {
      ru: "Сколько ты изучаешь/торгуешь на крипторынке?",
      en: "How long have you been studying/trading crypto?",
      ua: "Скільки ти вже вивчаєш/торгуєш на крипторинку?",
    },
    answers: [
      { text: { ru: "Только начал", en: "Just started", ua: "Тільки почав" } score: 1, correct: true },
      { text: { ru: "До года", en: "Less than a year", ua: "До року" } score: 2, correct: true },
      { text: { ru: "Больше года", en: "More than a year", ua: "Більше року" } score: 3, correct: true },
      { text: { ru: "Больше 2-х лет", en: "More than 2 years", ua: "Більше 2 років" } score: 4, correct: true }
    ]
  }
];
