var Models = require('../models')
const { Op } = require("sequelize")
const sequelize = require('../config/sequelize')

const ndchitiet_cdr = Models.ndchitiet_cdr
const noidungchitiet = Models.noidungchitiet

/* Xem noi dung */
exports.read = function (req, res) {
    noidungchitiet.findAll({
        include: ndchitiet_cdr
    })
        .then(data => {
            data = data.map(danhgia => ({
                chuong: danhgia.chuong,
                tuan: danhgia.tuan,
                nd_trenlop: danhgia.nd_trenlop,
                nd_onha: danhgia.nd_onha,
                chuandaura: danhgia.ndchitiet_cdrs.map(cdr => ({
                    ma_cdr: cdr.ma_cdr,
                    trenlop_onha: cdr.trenlop_onha
                }))
            }))
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Tao noi dung */
exports.create = function (req, res) {
    const chuandaura = req.body.chuandaura.map(cdr => ({
        ma_cdr: cdr.ma_cdr,
        ma_muctieu: cdr.muctieu,
        ma_monhoc: req.params.mamh,
        chuong: req.body.chuong,
        trenlop_onha: cdr.trenlop_onha
    }))
    noidungchitiet.create({
        chuong: req.body.chuong,
        tuan: req.body.tuan,
        ma_monhoc: req.params.mamh,
        nd_trenlop: req.body.nd_trenlop,
        nd_onha: req.body.nd_onha,
        ndchitiet_cdrs: chuandaura
    }, {
        include: [ndchitiet_cdr]
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

/* Chinh sua */
exports.update = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        const cdr_moi = req.body.chuandaura.add.map(cdr => ({
            ma_cdr: cdr.ma_cdr,
            ma_muctieu: cdr.muctieu,
            ma_monhoc: req.params.mamh,
            chuong: req.body.chuong,
            trenlop_onha: cdr.trenlop_onha
        }))
        //
        await noidungchitiet.update({
            tuan: req.body.tuan,
            nd_trenlop: req.body.nd_trenlop,
            nd_onha: req.body.nd_onha,
            ma_monhoc: req.params.mamh
        }, {
            where: {
                ma_monhoc: req.params.mamh,
                chuong: req.body.chuong
            }
        })
        //
        const cdr_xoa = req.body.chuandaura.xoa.map(cdr => ({
            [Op.and]: [
                { trenlop_onha: cdr.trenlop_onha },
                { ma_cdr: cdr.ma_cdr }
            ]
        }))
        await ndchitiet_cdr.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                chuong: req.body.chuong,
                [Op.or]: cdr_xoa
            }
        })
        //
        await ndchitiet_cdr.bulkCreate(cdr_moi)
        res.sendStatus(200);
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}