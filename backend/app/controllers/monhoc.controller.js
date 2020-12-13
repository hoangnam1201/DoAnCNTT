var Models = require('../models')

const bomon = Models.bomon
const monhoc = Models.monhoc

/* Lay danh sach cac mon hoc */
exports.read = function (req, res) {
    monhoc.findAll({
        include: bomon
    })
        .then(data => {
            data = data.map(monhoc => {
                return {
                    mamh: monhoc.id,
                    tenmh: monhoc.ten,
                    sotinchi: monhoc.sotinchi,
                    bomon: monhoc.bomon.ten,
                    phanloai: monhoc.phanloai
                }
            })
            return res.status(200).send(data)
        })
        .catch(err => {
            return res.send(err)
        })
}

/* Lay thong tin 1 mon hoc */
exports.readOne = function (req, res) {
    monhoc.findByPk(req.params.mamh, {
        include: bomon
    })
        .then(data => {
            return res.status(200).send({
                mamh: data.id,
                tenmh: data.ten,
                sotinchi: data.sotinchi,
                bomon: data.bomon.ten,
                phanloai: data.phanloai,
                mota: data.mota
            })
        })
        .catch(err => res.status(500).send(err))
}

/* Them 1 mon hoc moi */
exports.create = function (req, res) {
    monhoc.create({
        id: req.body.mamh,
        ten: req.body.tenmh,
        sotinchi: req.body.sotinchi,
        phanloai: req.body.phanloai,
        mota: req.body.mota,
        ma_bomon: req.body.bomon
    })
        .then(success => res.sendStatus(200))
        .catch(err => res.status(400).json({ error: err.message }))
}

/* Chinh sua 1 mon hoc */
exports.update = function (req, res) {
    monhoc.update({
        id: req.body.mamh,
        ten: req.body.tenmh,
        sotinchi: req.body.sotinchi,
        phanloai: req.body.phanloai,
        mota: req.body.mota,
        ma_bomon: req.body.mabomon
    }, {
        where: {
            id: req.params.mamh
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
}

/* Xoa 1 mon hoc */
exports.delete = function (req, res) {
    monhoc.destroy({
        where: {
            id: req.params.mamh
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}