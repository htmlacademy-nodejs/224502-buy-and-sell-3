'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);

const {
  getRandomInt,
  shuffle,
  getPictureFileName
} = require(`../utils`);

const {
  ExitCode
} = require('../constants');

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится— верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле— сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

const OfferType = {
  offer: `offer`,
  sale: `sale`
};

const SumRestrict = {
  min: 1000,
  max: 100000
};

const PictureRestrict = {
  min: 1,
  max: 16
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
  }))
);

module.exports = {
  name: `--generate`,
  run(count) {
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    let content = '';
    if (count > 1000) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.fail);
    }
    try {
      content = JSON.stringify(generateOffers(countOffer));
    } catch (e) {
      console.error(chalk.red(`Can't stringify an object...`), chalk.red(e));
      process.exit(ExitCode.fail);
    }

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(chalk.red(`Can't write data to file...`));
      }
      return console.info(chalk.green(`Operation success. File created.`));
    });
  }
}
