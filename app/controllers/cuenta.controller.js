const db = require('../config/db.config.js');
const Cuenta = db.Cuenta;

// Crear una nueva Cuenta
exports.create = (req, res) => {
    let cuenta = {};

    try {
        // Construir objeto Cuenta desde el cuerpo de la solicitud
        cuenta.no_cuenta = req.body.no_cuenta;
        cuenta.tipo_cuenta = req.body.tipo_cuenta;
        cuenta.nombre = req.body.nombre;
        cuenta.fecha_ingreso = req.body.fecha_ingreso;
        cuenta.fecha_nacimiento = req.body.fecha_nacimiento;
        cuenta.genero = req.body.genero;
        cuenta.saldo_inicial = req.body.saldo_inicial;

        // Guardar en la base de datos
        Cuenta.create(cuenta).then(result => {    
            res.status(200).json({
                message: "Creado con éxito una Cuenta con id = " + result.id,
                cuenta: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Recuperar todas las Cuentas
exports.retrieveAllCuentas = (req, res) => {
    Cuenta.findAll()
        .then(cuentaInfos => {
            res.status(200).json({
                message: "Recuperadas todas las Cuentas exitosamente!",
                cuentas: cuentaInfos
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

// Obtener Cuenta por ID
exports.getCuentaById = (req, res) => {
    let cuentaId = req.params.id;
    Cuenta.findByPk(cuentaId)
        .then(cuenta => {
            res.status(200).json({
                message: "Cuenta obtenida exitosamente con id = " + cuentaId,
                cuenta: cuenta
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

// Filtrar Cuentas por género
exports.filteringByGenero = (req, res) => {
    let genero = req.query.genero;

    Cuenta.findAll({
        attributes: ['id', 'nombre', 'genero', 'no_cuenta', 'saldo_inicial'],
        where: { genero: genero }
    })
    .then(results => {
        res.status(200).json({
            message: "Cuentas filtradas por género = " + genero,
            cuentas: results,
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

// Paginación de Cuentas
exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        const offset = page ? page * limit : 0;

        Cuenta.findAndCountAll({ limit: limit, offset: offset })
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
                        "cuentas": data.rows
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

// Paginación, filtrado y ordenación de Cuentas
exports.pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let genero = req.query.genero;
        const offset = page ? page * limit : 0;

        Cuenta.findAndCountAll({
            attributes: ['id', 'nombre', 'genero', 'no_cuenta', 'saldo_inicial'],
            where: { genero: genero },
            order: [
                ['nombre', 'ASC'],
                ['no_cuenta', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
        .then(data => {
            const totalPages = Math.ceil(data.count / limit);
            const response = {
                message: "Paginación, filtrado y ordenación completados! Parámetros de consulta: página = " + page + ", límite = " + limit + ", género = " + genero,
                data: {
                    "totalItems": data.count,
                    "totalPages": totalPages,
                    "limit": limit,
                    "genero-filtering": genero,
                    "currentPageNumber": page + 1,
                    "currentPageSize": data.rows.length,
                    "cuentas": data.rows
                }
            };
            res.send(response);
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> No se puede completar la solicitud de paginación, filtrado y ordenación!",
            error: error.message,
        });
    }
};

// Actualizar Cuenta por ID
exports.updateById = async (req, res) => {
    try {
        let cuentaId = req.params.id;
        let cuenta = await Cuenta.findByPk(cuentaId);

        if (!cuenta) {
            res.status(404).json({
                message: "No se encontró la cuenta con id = " + cuentaId,
                cuenta: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                tipo_cuenta: req.body.tipo_cuenta,
                saldo_inicial: req.body.saldo_inicial
            };
            let result = await Cuenta.update(updatedObject, { returning: true, where: { id: cuentaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la cuenta con id = " + req.params.id,
                    error: "No actualizado",
                });
            }

            res.status(200).json({
                message: "Cuenta actualizada exitosamente con id = " + cuentaId,
                cuenta: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la cuenta con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar Cuenta por ID
exports.deleteById = async (req, res) => {
    try {
        let cuentaId = req.params.id;
        let cuenta = await Cuenta.findByPk(cuentaId);

        if (!cuenta) {
            res.status(404).json({
                message: "No existe una cuenta con id = " + cuentaId,
                error: "404",
            });
        } else {
            await cuenta.destroy();
            res.status(200).json({
                message: "Cuenta eliminada exitosamente con id = " + cuentaId,
                cuenta: cuenta,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la cuenta con id = " + req.params.id,
            error: error.message,
        });
    }
};
