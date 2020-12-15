const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('danhgia', {
    hinhthuc: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    noidung: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thoidiem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    congcu_kt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tile: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    },
    phanloai: {
      type: DataTypes.TEXT,
      allowNull: false
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
          { name: "hinhthuc" },
          { name: "ma_monhoc" },
        ]
      },
    ]
  });
};
