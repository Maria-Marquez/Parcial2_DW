
module.exports = (sequelize, Sequelize) => {
	const Cuenta = sequelize.define('transaccion', {	
	  id_registro: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  id_Cuenta: {
			type: Sequelize.INTEGER
	  },
	  FechaHoraIngreso: {
			type: Sequelize.DATETIME
  	},
	  id_tipoTransaccion: {
			type: Sequelize.INTEGER
	  },
	  MontoTransaccionCredito: {
			type: Sequelize.FLOAT
      },
	  MontoTransaccionCredito: {
		type: Sequelize.FLOAT
  	  },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'Parcial DW UMG Antigua'
    }
	});
	
	return Transaccion;
}