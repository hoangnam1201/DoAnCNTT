/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  var danhgia = sequelize.define('danhgia', {
    stt: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      primaryKey: true
    },
    hinhthuc: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    noidung: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    thoidiem: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    congcu_kt: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    tile: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'danhgia',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "danhgia_pkey",
        unique: true,
        fields: [
          { name: "stt" },
          { name: "hinhthuc" },
          { name: "ma_monhoc" },
        ]
      },
    ]
  });
  danhgia.removeAttribute('id');
  return danhgia;
};
