
module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('tipo', {	
	  id_tipoTransaccion: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  descripcion: {
			type: Sequelize.STRING
	  },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Tipo;
}