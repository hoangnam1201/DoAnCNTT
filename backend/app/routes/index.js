let router = require('express').Router()
const bomonRoute = require('./bomon.route')
const monhocRoute = require('./monhoc.route')

/* Bo mon */
router.use('/bomon', bomonRoute)

/* Mon hoc */
router.use('/monhoc', monhocRoute)

module.exports = router;