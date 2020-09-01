'use strict';

const {
  Router
} = require(`express`);
const search = new Router();

search.get(`/`, (req, res) => {
  res.render(`search/search-result`);
});

module.exports = search;
