const databaseService = () => {
    const knex = require('knex')({
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST,
            port : 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB,
        }
    });

    const table = 'usuarios';
    const table2 = 'productosp';
    const table3 = 'miembrosEmpresa';
    const table4 = 'slider';
    const table5 = "categorias";
    const table6 = "repuestos"
    const table7 = "contacto"

    // CREARRR

    const crearUser = ({nombre,correo, contraseña}) => {
        return knex(table).insert({
            nombre: nombre,
            correo: correo,
            contraseña: contraseña
        }); //retorna una promesa
    };

    const crearProducto = ({img, nombre, descripcion, precio, categoria_id}) => {
        return knex(table2).insert({
            img: img,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria_id: categoria_id
        }); //retorna una promesa
    };

    const crearMiembroE = ({img, nombre, cargo}) => {
        return knex(table3).insert({
            img: img,
            nombre: nombre,
            cargo: cargo
        });
    };

    const crearSlider = ({img, texto1, texto_central, texto2}) => {
        return knex(table4).insert({
            img: img,
            texto1: texto1,
            texto_central: texto_central,
            texto2: texto2
        });
    };

    const crearCategoria = ({nombre, descripcion}) => {
        return knex(table5).insert({
            nombre: nombre,
            descripcion: descripcion
        })
    }

    const crearRepuesto = ({img, nombre, categoria_id, descripcion, precio}) => {
        return knex(table6).insert({
            img: img,
            nombre: nombre,
            categoria_id: categoria_id,
            descripcion: descripcion,
            precio: precio
        })
    }

    const crearContacto = ({nombre, email, celular, ciudad, mensaje}) => {
        return knex(table7).insert({
            nombre: nombre,
            email: email,
            celular: celular,
            ciudad: ciudad,
            mensaje:mensaje
        })
    }
    //mostrar 

    const mostrarProductos = () => {
        return knex(table2).select();
    }

    const mostrarUser = () => {
        return knex(table).select();
    }

    const mostrarMiembrosE = () => {
        return knex(table3).select();
    }

    const mostrarSlider = () => {
        return knex(table4).select();
    }

    const mostrarCategoria = () => {
        return knex(table5).select();
    }
    const mostrarRepuesto = () => {
        return knex(table6).select()
    }

    const mostrarContactanos = () => {
        return knex(table7).select
    }

    //detalles
    const buscarProductoPorId = (id) => {
        return knex(table2)
                .where('id', id)
                .first(); // Para obtener solo el primer resultado (debería ser único por ID)
    }

    const repuestoId = (id) => {
        return knex(table6)
        .where('id', id)
    }

    

    return{
        crearUser,
        mostrarUser,
        crearProducto,
        mostrarProductos,
        buscarProductoPorId,
        crearMiembroE,
        mostrarMiembrosE,
        crearSlider,
        mostrarSlider,
        mostrarCategoria,
        crearCategoria,
        mostrarRepuesto,
        crearRepuesto,
        repuestoId,
        crearContacto,
        mostrarContactanos
    };
};

module.exports = {
    databaseService
};