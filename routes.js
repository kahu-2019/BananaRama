var express = require('express')
var router = express.Router()
var fs = require('fs')

router.get('/', (req, res) => {
  res.send('hello bananas')
})

module.exports = router