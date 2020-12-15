/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var danhgia_chuandaura = sequelize.define('danhgia_chuandaura', {
    hinhthuc: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danhgia',
        key: 'hinhthuc'
      }
    },
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'ma_monhoc'
      }
    },
    ma_cdr: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'id'
      }
    },
    ma_muctieu: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'ma_muctieu'
      }
    }
  }, {
    sequelize,
    tableName: 'danhgia_chuandaura',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "danhgia_chuandaura_pkey",
        unique: true,
        fields: [
          { name: "hinhthuc" },
          { name: "ma_monhoc" },
          { name: "ma_cdr" },
          { name: "ma_muctieu" },
        ]
      },
    ]
  });
  danhgia_chuandaura.removeAttribute('id');
  return danhgia_chuandaura;
};
