const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/prophets', require('./prophets'))

router.use(
    '/',
    (docData = (req, res) => {
      let docData = {
        documentationURL: 'https://github.com/AlainSolo/lesson04-api-docs',
      };
      res.send(docData);
    })
  );

module.exports = router;