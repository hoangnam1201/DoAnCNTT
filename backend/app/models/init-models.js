var DataTypes = require("sequelize").DataTypes;
var _bomon = require("./bomon");
var _chuandaura = require("./chuandaura");
var _danhgia = require("./danhgia");
var _danhgia_chuandaura = require("./danhgia_chuandaura");
var _monhoc = require("./monhoc");
var _muctieu = require("./muctieu");
var _ndchitiet_cdr = require("./ndchitiet_cdr");
var _noidungchitiet = require("./noidungchitiet");
var _account = require("./account");

function initModels(sequelize) {
  var bomon = _bomon(sequelize, DataTypes);
  var chuandaura = _chuandaura(sequelize, DataTypes);
  var danhgia = _danhgia(sequelize, DataTypes);
  var danhgia_chuandaura = _danhgia_chuandaura(sequelize, DataTypes);
  var monhoc = _monhoc(sequelize, DataTypes);
  var muctieu = _muctieu(sequelize, DataTypes);
  var ndchitiet_cdr = _ndchitiet_cdr(sequelize, DataTypes);
  var noidungchitiet = _noidungchitiet(sequelize, DataTypes);
  var account = _account(sequelize, DataTypes);

  chuandaura.belongsTo(muctieu, { foreignKey: "ma_monhoc" });
  muctieu.hasMany(chuandaura, { foreignKey: "ma_monhoc" });
  chuandaura.belongsTo(muctieu, { foreignKey: "ma_monhoc" });
  muctieu.hasMany(chuandaura, { foreignKey: "ma_muctieu" });
  danhgia.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(danhgia, { foreignKey: "ma_monhoc" });
  danhgia_chuandaura.belongsTo(danhgia, { foreignKey: "hinhthuc" });
  danhgia.hasMany(danhgia_chuandaura, { foreignKey: "hinhthuc" });
  danhgia_chuandaura.belongsTo(chuandaura, { foreignKey: "ma_muctieu" });
  chuandaura.hasMany(danhgia_chuandaura, { foreignKey: "ma_cdr" });
  danhgia.hasMany(danhgia_chuandaura, { foreignKey: "ma_monhoc" });
  danhgia_chuandaura.belongsTo(chuandaura, { foreignKey: "ma_muctieu" });
  chuandaura.hasMany(danhgia_chuandaura, { foreignKey: "ma_muctieu" });
  monhoc.belongsTo(bomon, { foreignKey: "ma_bomon" });
  bomon.hasMany(monhoc, { foreignKey: "ma_bomon" });
  muctieu.belongsTo(monhoc, { foreignKey: "id" });
  monhoc.hasMany(muctieu, { foreignKey: "ma_monhoc" });
  ndchitiet_cdr.belongsTo(chuandaura, { foreignKey: "ma_muctieu" });
  chuandaura.hasMany(ndchitiet_cdr, { foreignKey: "ma_cdr" });
  ndchitiet_cdr.belongsTo(noidungchitiet, { foreignKey: "ma_monhoc" });
  noidungchitiet.hasMany(ndchitiet_cdr, { foreignKey: "ma_monhoc" });
  ndchitiet_cdr.belongsTo(chuandaura, { foreignKey: "ma_muctieu" });
  chuandaura.hasMany(ndchitiet_cdr, { foreignKey: "ma_muctieu" });
  ndchitiet_cdr.belongsTo(noidungchitiet, { foreignKey: "ma_monhoc" });
  noidungchitiet.hasMany(ndchitiet_cdr, { foreignKey: "chuong" });
  noidungchitiet.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(noidungchitiet, { foreignKey: "ma_monhoc" });

  return {
    bomon,
    chuandaura,
    danhgia,
    danhgia_chuandaura,
    monhoc,
    muctieu,
    ndchitiet_cdr,
    noidungchitiet,
    account
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
