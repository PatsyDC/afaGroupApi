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
    const table8 = "carrito"
    const table9 = "blog"

    // CREARRR

    const crearUser = ({nombre,correo, contraseña}) => {
        return knex(table).insert({
            nombre: nombre,
            correo: correo,
            contraseña: contraseña
        }); //retorna una promesa
    };

    const crearProducto = ({img, nombre, descripcion, precio, categoria_id, ficha_p, pdf}) => { 
        return knex(table2).insert({
            img: img,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria_id: categoria_id,
            ficha_p: ficha_p,
            pdf:pdf
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

    const crearRepuesto = ({img, nombre, categoria_id, descripcion, precio, codigo}) => {
        return knex(table6).insert({
            img: img,
            nombre: nombre, 
            categoria_id: categoria_id,
            descripcion: descripcion, 
            precio: precio,
            codigo: codigo 
        })
    }

    const crearContacto = ({nombre, email, celular, ciudad, mensaje, fecha}) => {
        return knex(table7).insert({
            nombre: nombre,
            email: email,
            celular: celular,
            ciudad: ciudad,
            mensaje:mensaje,
            fecha: fecha
        })
    }

    const crearCarrito = ({ id_product, img_product, nombre_product, precio_product, cantidad }) =>{
        return knex(table8).insert({
            id_product: id_product,
            img_product: img_product,
            nombre_product: nombre_product,
            precio_product: precio_product,
            cantidad: cantidad
        })
    }
    const crearBlog = ({titulo, texto_corto, texto_largo, link, img}) =>{
        return knex(table9).insert({
            titulo: titulo,
            texto_corto: texto_corto,
            texto_largo: texto_largo,
            link: link,
            img:img
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
        return knex(table7).select();
    };

    const mostrarCarrito = () => {
        return knex(table8).select();
    };

    const mostrarBlog = () => {
        return knex(table9).select();
    };

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

    const detalleCarrito = (id) => {
        return knex(table8)
        .where('id', id)
    }

    const sliderDetalle = (id) => {
        return knex(table4)
        .where('id', id)
    }

    const detalleBlog = (id) => {
        return knex(table9)
        .where('id', id)
    }

    //actualizar

    const actualizarCarrito = (idCarrito, updatedCarrito) => {
        return knex(table8)
        .where('id', idCarrito)
        .update(updatedCarrito);
    };

    const actualizarCategoria = ({id, nombre, descripcion}) => {
        return knex(table5).where({ id: id }).update({
            nombre: nombre,
            descripcion: descripcion
        });
    }

    const actualizarRepuesto = (id, img, nombre, categoria_id, descripcion, precio, codigo) => {
        return knex(table6).where({ id: id }).update({
            img: img,
            nombre: nombre,
            categoria_id: categoria_id,
            descripcion: descripcion,
            precio: precio,
            codigo: codigo
        })
    }

    const actualizarProducto = (id, img, nombre, descripcion, precio, categoria_id, ficha_p, pdf) => {
        return knex(table2).where({ id: id }).update({
            img: img,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria_id: categoria_id,
            ficha_p: ficha_p,
            pdf:pdf
        }); 
    }
    
    const actualizarBlog = (id, titulo, texto_corto, texto_largo, link, img) => {
        return knex(table9).where({ id: id }).update({
            titulo: titulo,
            texto_corto: texto_corto,
            texto_largo: texto_largo,
            link: link,
            img: img
        }); 
    }
    

    //eliminar
    const eliminarCategoria = (id) => {
        return knex(table5).where({ id: id }).del();
    }

    const eliminarProducto = (id) => {
        return knex(table2).where({ id: id }).del();
    }

    const eliminarRepuesto = (id) => {
        return knex(table6).where({ id: id }).del();
    }

    const eliminarBlog = (id) => {
        return knex(table9).where({ id: id }).del();
    }
    

    

    return{
        crearUser,
        mostrarUser,

        crearProducto,
        mostrarProductos,
        buscarProductoPorId,
        actualizarProducto,
        eliminarProducto,
        
        crearMiembroE,
        mostrarMiembrosE,
        crearSlider,
        mostrarSlider,
        sliderDetalle,
        mostrarCategoria,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria,

        mostrarRepuesto,
        crearRepuesto,
        repuestoId,
        eliminarRepuesto,
        actualizarRepuesto,

        crearContacto,
        mostrarContactanos,

        crearCarrito,
        mostrarCarrito,
        detalleCarrito,
        actualizarCarrito, 


        crearBlog,
        mostrarBlog,
        detalleBlog,
        actualizarBlog,
        eliminarBlog
    };
};

module.exports = {
    databaseService
};