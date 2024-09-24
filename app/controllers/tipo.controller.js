const db = require('../config/db.config.js'); 
const Tipo = db.Tipo;

exports.create = (req, res) => {
    let tipo = {};

    try{
        // Building Tipo object from request's body
        tipo.descripcion = req.body.descripcion; // 'debito' o 'credito'
      
        // Save to MySQL database
        Tipo.create(tipo).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Se creó correctamente un tipo de transacción con id = " + result.id,
                tipo: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Recuperar todos los Tipos
exports.retrieveAllTipos = (req, res) => {
    Tipo.findAll()
        .then(tipoInfos => {
            res.status(200).json({
                message: "Recuperados todos los Tipos exitosamente!",
                tipos: tipoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener Tipo por ID
exports.getTipoById = (req, res) => {
    let tipoId = req.params.id;
    Tipo.findByPk(tipoId)
        .then(tipo => {
            res.status(200).json({
                message: "Tipo obtenido exitosamente con id = " + tipoId,
                tipo: tipo
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Paginación de Tipos
exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;

        Tipo.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginación completada! Parámetros de consulta: página = " + page + ", límite = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "tipos": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> No se puede completar la solicitud de paginación!",
            error: error.message,
        });
    }
};

// Actualizar Tipo por ID
exports.updateById = async (req, res) => {
    try {
        let tipoId = req.params.id;
        let tipo = await Tipo.findByPk(tipoId);

        if (!tipo) {
            res.status(404).json({
                message: "No se encontró el tipo con id = " + tipoId,
                tipo: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion
            };
            let result = await Tipo.update(updatedObject, { returning: true, where: { id: tipoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el tipo con id = " + req.params.id,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Tipo actualizado exitosamente con id = " + tipoId,
                tipo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el tipo con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar Tipo por ID
exports.deleteById = async (req, res) => {
    try {
        let tipoId = req.params.id;
        let tipo = await Tipo.findByPk(tipoId);

        if (!tipo) {
            res.status(404).json({
                message: "No existe un tipo con id = " + tipoId,
                error: "404",
            });
        } else {
            await tipo.destroy();
            res.status(200).json({
                message: "Tipo eliminado exitosamente con id = " + tipoId,
                tipo: tipo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el tipo con id = " + req.params.id,
            error: error.message,
        });
    }
};
