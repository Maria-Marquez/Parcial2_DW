
module.exports = (sequelize, Sequelize) => {
	const Cuenta = sequelize.define('cuenta', {	
	  id_Cuenta: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  no_cuenta: {
			type: Sequelize.STRING
	  },
	  tipo_cuenta: {
			type: Sequelize.STRING
  	},
	  nombre: {
			type: Sequelize.STRING
	  },
	  fecha_ingreso: {
			type: Sequelize.DATE
      },
	  fecha_nacimiento: {
		type: Sequelize.DATE
  	  },
  	  genero: {
		type: Sequelize.STRING
      },
      saldo_inicial: {
		type: Sequelize.FLOAT
      },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'Parcial DW UMG Antigua'
    }
	});
	
	return Cuenta;
}