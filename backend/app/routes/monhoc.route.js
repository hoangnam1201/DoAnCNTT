let router = require('express').Router()
var monhocController = require('../controllers/monhoc.controller')
var muctieuController = require('../controllers/muctieu.controller')
var cdrController = require('../controllers/chuandaura.controller')
var danhgiaController = require('../controllers/danhgia.controller')
var noidungController = require('../controllers/ndchitiet.controller')

/* Thong tin co ban */
router.get('/', monhocController.read)
router.get('/:mamh', monhocController.readOne)
router.post('/', monhocController.create)
router.put('/:mamh', monhocController.update)
router.delete('/:mamh', monhocController.delete)

/* Muc tieu */
router.get('/:mamh/muctieu', muctieuController.readAll)
router.get('/:mamh/muctieu/list', muctieuController.readList)
router.post('/:mamh/muctieu', muctieuController.create)
router.put('/:mamh/muctieu/:muctieu', muctieuController.update)
router.delete('/:mamh/muctieu/:muctieu', muctieuController.delete)

/* Chuan dau ra */
router.get('/:mamh/chuandaura', cdrController.read)
router.post('/:mamh/chuandaura/:muctieu', cdrController.create)
router.put('/:mamh/chuandaura/:muctieu/:cdr', cdrController.update)

/* Danh gia */
router.get('/:mamh/danhgia', danhgiaController.read)
router.post('/:mamh/danhgia', danhgiaController.create)
router.put('/:mamh/danhgia', danhgiaController.update)

/* Noi dung chi tiet */
router.get('/:mamh/noidung', noidungController.read)
router.post('/:mamh/noidung', noidungController.create)
router.put('/:mamh/noidung', noidungController.update)

module.exports = router;