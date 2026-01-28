// Importar las dependencias
import Field from "./field.model.js ";

// Controles
export const geFields = async (req, res) => {
    try {
        // Datos que vienen de la query
        const { page = 1, limit = 10 } = req.query;

        // Variables que utilizaremos para filtrar
        // Como se realiza el filtro depende de si viene el isActive
        const filter = {isActive: true};

        // Opciones de  paginacion
        const options = {
            // Convertimos a numero
            page: parseInt(page),
            // Convertimos a numero
            limit: parseInt(limit),
            // Ordenamos por fecha de creacion
            sort: { createAt: -1}
        }

        // Realizar la consulta al schema Field
        const fields = await Field.find(filter)
            .limit(limit)
            .skip(page -1 * limit)
            .sort(options.sort);

        // conteo de doucumentos de la consulta
        const total = await Field.countDocuments(filter);

        // respuesta
        res.status(200).json({
            ok: true,
            data: fields,
            pagination: {
                currentPage:  page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: limit,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos',
            error: error.message,
        });

    }
};
