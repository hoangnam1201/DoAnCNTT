var Models = require('../models')
const { Op } = require("sequelize")
const sequelize = require('../config/sequelize')

const danhgia_chuandaura = Models.danhgia_chuandaura
const danhgia = Models.danhgia

/* Xem danh gia */
exports.read = function (req, res) {
    danhgia.findAll({
        include: danhgia_chuandaura,
        where: {
            ma_monhoc: req.params.mamh
        }
    })
        .then(data => {
            data = data.map(danhgia => ({
                hinhthuc: danhgia.hinhthuc,
                phanloai: danhgia.phanloai,
                noidung: danhgia.noidung,
                thoidiem: danhgia.thoidiem,
                congcu_kt: danhgia.congcu_kt,
                tile: danhgia.tile,
                chuandaura: danhgia.danhgia_chuandauras.map(cdr => cdr.ma_cdr)
            }))
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Tao danh gia */
exports.create = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        const chuandaura = req.body.chuandaura.map(cdr => ({
            ma_cdr: cdr.cdr,
            ma_muctieu: cdr.muctieu,
            ma_monhoc: req.params.mamh,
            hinhthuc: req.body.hinhthuc
        }))
        await danhgia.create({
            phanloai: req.body.phanloai,
            hinhthuc: req.body.hinhthuc,
            noidung: req.body.noidung,
            thoidiem: req.body.thoidiem,
            congcu_kt: req.body.congcu_kt,
            tile: req.body.tile,
            ma_monhoc: req.params.mamh
        })
        await danhgia_chuandaura.bulkCreate(chuandaura)
        res.sendStatus(200);
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

/* Chinh sua */
exports.update = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        const cdr_moi = req.body.chuandaura.add.map(cdr => {
            return ({
                ma_cdr: cdr.ma_cdr,
                ma_muctieu: cdr.muctieu,
                ma_monhoc: req.params.mamh,
                hinhthuc: req.body.hinhthuc
            })
        })
        //
        await danhgia.update({
            phanloai: req.body.phanloai,
            hinhthuc: req.body.hinhthuc,
            noidung: req.body.noidung,
            thoidiem: req.body.thoidiem,
            congcu_kt: req.body.congcu_kt,
            tile: req.body.tile,
            ma_monhoc: req.params.mamh
        }, {
            where: {
                ma_monhoc: req.params.mamh,
                hinhthuc: `${req.query.ht}``${req.query.stt}`
            }
        })
        //
        await danhgia_chuandaura.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                hinhthuc: req.body.hinhthuc,
                ma_cdr: {
                    [Op.in]: req.body.chuandaura.delete
                }
            }
        })
        //
        await danhgia_chuandaura.bulkCreate(cdr_moi)
        res.sendStatus(200);
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

//
exports.delete = function (req, res) {
    danhgia.destroy({
        where: {
            ma_monhoc: req.params.mamh,
            hinhthuc: `${req.query.ht}``${req.query.stt}`
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}