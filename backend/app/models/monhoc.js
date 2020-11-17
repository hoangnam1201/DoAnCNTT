/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monhoc', {
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    ten: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: "monhoc_ten_key"
    },
    sotinchi: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    mota: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_bomon: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'bomon',
        key: 'id'
      }
    },
    phanloai: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'monhoc',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "monhoc_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "monhoc_ten_key",
        unique: true,
        fields: [
          { name: "ten" },
        ]
      },
    ]
  });
};
