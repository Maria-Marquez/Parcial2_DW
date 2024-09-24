const db = require('../config/db.config.js'); 
const Transaccion = db.Transaccion;

exports.create = (req, res) => {
    let transaccion = {};

    try {
        // Building Transaccion object from request's body
        transaccion.id_Cuenta = req.body.id_Cuenta;
        transaccion.FechaHoraIngreso = req.body.FechaHoraIngreso; // Corrigiendo el nombre de la variable
        transaccion.id_tipoTransaccion = req.body.id_tipoTransaccion;
        transaccion.MontoTransaccionCredito = req.body.MontoTransaccionCredito;
        transaccion.MontoTransaccionCredito = req.body.MontoTransaccionDebito;

        // Save to MySQL database
        Transaccion.create(transaccion).then(result => {    
            res.status(200).json({
                message: "Se creó correctamente una transacción con id = " + result.id,
                transaccion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
}

// Recuperar todas las Transacciones
exports.retrieveAllTransacciones = (req, res) => {
    Transaccion.findAll()
        .then(transaccionInfos => {
            res.status(200).json({
                message: "Recuperadas todas las transacciones exitosamente!",
                transacciones: transaccionInfos
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

// Obtener Transaccion por ID
exports.getTransaccionById = (req, res) => {
    let transaccionId = req.params.id;
    Transaccion.findByPk(transaccionId)
        .then(transaccion => {
            res.status(200).json({
                message: "Transacción obtenida exitosamente con id = " + transaccionId,
                transaccion: transaccion
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

// Paginación de Transacciones
exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;

        Transaccion.findAndCountAll({ limit: limit, offset: offset })
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
                        "transacciones": data.rows
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

// Actualizar Transaccion por ID
exports.updateById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await Transaccion.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No se encontró la transacción con id = " + transaccionId,
                transaccion: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_Cuenta: req.body.id_Cuenta,
                FechaHoraIngreso: req.body.FechaHoraIngreso,
                id_tipoTransaccion: req.body.id_tipoTransaccion,
                MontoTransaccionCredito: req.body.MontoTransaccionCredito,
                MontoTransaccionDebito: req.body.MontoTransaccionDebito
            };
            let result = await Transaccion.update(updatedObject, { returning: true, where: { id: transaccionId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Transacción actualizada exitosamente con id = " + transaccionId,
                transaccion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la transacción con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar Transaccion por ID
exports.deleteById = async (req, res) => {
    try {
        let transaccionId = req.params.id;
        let transaccion = await Transaccion.findByPk(transaccionId);

        if (!transaccion) {
            res.status(404).json({
                message: "No existe una transacción con id = " + transaccionId,
                error: "404",
            });
        } else {
            await transaccion.destroy();
            res.status(200).json({
                message: "Transacción eliminada exitosamente con id = " + transaccionId,
                transaccion: transaccion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la transacción con id = " + req.params.id,
            error: error.message,
        });
    }
};
