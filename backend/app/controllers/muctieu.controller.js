var Models = require('../models')

const muctieu = Models.muctieu
const monhoc = Models.muctieu

/* Lay thong tin muc tieu 1 mon hoc */
exports.read = function (req, res) {
    muctieu.findAll({
        where: {
            ma_monhoc: req.params.mamh
        }
    })
        .then(data => {
            data = data.map(muctieu => ({
                muctieu: muctieu.id,
                mota: muctieu.mota,
                cdr_ctdt: muctieu.cdr_ctdt
            }))
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Them muc tieu mon hoc */
exports.create = function (req, res) {
    muctieu.create({
        id: req.body.muctieu,
        ma_monhoc: req.params.mamh,
        cdr_ctdt: req.body.cdr_ctdt,
        mota: req.body.mota
    })
        .then(success => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

/* Chinh sua muc tieu */
exports.update = function (req, res) {
    muctieu.update({
        id: req.body.muctieu,
        cdr_ctdt: req.body.cdr_ctdt,
        mota: req.body.mota
    },{
        where:{
            id: req.params.muctieu,
            ma_monhoc: req.params.mamh
        }
    })
        .then(success => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}