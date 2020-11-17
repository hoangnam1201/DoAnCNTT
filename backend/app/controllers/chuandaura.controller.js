var Models = require('../models')

const chuandaura = Models.chuandaura
const muctieu = Models.muctieu

/* Lay thong tin chuan dau ra mon hoc */
exports.read = function (req, res) {
    muctieu.findAll({
        where: {
            ma_monhoc: req.params.mamh
        },
        include: [{
            model: chuandaura,
            where: {
                ma_monhoc: req.params.mamh
            }
        }]
    })
        .then(data => {
            data = data.map(muctieu => ({
                muctieu: muctieu.id,
                chuandaura: muctieu.chuandauras.map(cdr => ({
                    cdr: cdr.id,
                    mota: cdr.mota,
                    cdio: cdr.cdio
                }))
            }))
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Them chuan dau ra */
exports.create = function (req, res) {
    chuandaura.create({
        id: req.body.cdr,
        ma_monhoc: req.params.mamh,
        ma_muctieu: req.params.muctieu,
        mota: req.body.mota,
        cdio: req.body.cdio
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

/* Sua chuan dau ra */
exports.update = function (req, res) {
    chuandaura.update({
        id: req.body.cdr,
        ma_monhoc: req.body.mamh,
        ma_muctieu: req.body.muctieu,
        mota: req.body.mota,
        cdio: req.body.cdio
    }, {
        where: {
            id: req.params.cdr,
            ma_monhoc: req.params.mamh,
            ma_muctieu: req.params.muctieu
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}