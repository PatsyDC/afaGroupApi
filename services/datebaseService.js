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
    const table2 = 'productosp'

    const crearUser = ({nombre,correo, contraseña}) => {
        return knex(table).insert({
            nombre: nombre,
            correo: correo,
            contraseña: contraseña
        }); //retorna una promesa
    };

    const crearProducto = ({img, nombre, descripcion, precio}) => {
        return knex(table2).insert({
            img: img,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        }); //retorna una promesa
    };

    const mostrarProductos = () => {
        return knex(table2).select();
    }

    const mostrarUser = () => {
        return knex(table).select();
    }

    return{
        crearUser,
        mostrarUser,
        crearProducto,
        mostrarProductos
    };
};

module.exports = {
    databaseService
};