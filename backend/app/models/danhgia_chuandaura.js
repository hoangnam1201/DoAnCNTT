const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('danhgia_chuandaura', {
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danhgia',
        key: 'ma_monhoc'
      }
    },
    hinhthuc: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danhgia',
        key: 'hinhthuc'
      }
    },
    ma_cdr: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'ma_muctieu'
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
          { name: "ma_monhoc" },
          { name: "hinhthuc" },
          { name: "ma_cdr" },
          { name: "ma_muctieu" },
        ]
      },
    ]
  });
};
