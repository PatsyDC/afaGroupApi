module.exports = function(app, databaseService){
    const multer = require('multer');
    const path = require('path'); // Importamos el módulo 'path'

    // Configuración de almacenamiento
    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
          // Corrección: Aseguramos la extensión original
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
        }
    });
      
    const upload = multer({ storage: storage });

    const afa = upload.fields([
    { name: 'img', maxCount: 1 }, 
    { name: 'ficha_p', maxCount: 1 }
    ]);

    app.get('/', (req, res) =>{
        res.json({"mensaje": "hi"});
    });

    // USUARIOS

    app.get('/usuarios',(req, res) =>{
        databaseService.mostrarUser()
        .then(users =>{
            res.json(users);
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
    });

    app.post('/usuarios',(req, res) =>{
        const nuevoUser = req.body;
        console.log(nuevoUser);

        databaseService.crearUser(nuevoUser)
        .then(() => { //despues de la escritura en la bd se muestar el lenguake
            res.json({"mensaje": "nuevo user"});
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
        
    });

    //CATEGORIAS

    app.get('/categorias', (req, res) => {
        databaseService.mostrarCategoria()
        .then(categorias => {
            res.json(categorias);
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
    });

    app.post('/categorias',(req, res) =>{
        const newCategoria = req.body;
        console.log(newCategoria);

        databaseService.crearCategoria(newCategoria)
        .then(() => { //despues de la escritura en la bd se muestar 
            res.json({"mensaje": "nueva categoria"});
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
        
    });

    app.delete('/categorias/:id', (req, res) => {
        const { id } = req.params;

        databaseService.eliminarCategoria(id)
        .then(() => {
            res.json({"mensaje": "categoria eliminada"});
        }).catch(e => {
            res.status(500).json(e);
        });
    });

    app.put('/categorias/:id', (req, res) => {
        const { id } = req.params;
        const updatedCategoria = req.body;
    
        databaseService.actualizarCategoria({ id, ...updatedCategoria })
        .then(() => {
            res.json({"mensaje": "categoria actualizada"});
        }).catch(e => {
            console.error("Error updating category:", e);
            res.status(500).json({ error: "Internal Server Error", details: e });
        });
    });

    //PRODUCTOS

    app.get('/productosP',(req, res) =>{
        databaseService.mostrarProductos()
        .then(productos =>{
            res.json(productos);
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
    });

    app.get('/productosP/:id', (req, res) => {
        const idProducto = req.params.id; // Captura el parámetro ID de la URL
        databaseService.buscarProductoPorId(idProducto) // Llama a la función para buscar por ID
            .then(producto => {
                if (!producto) { // Si no se encuentra el producto
                    res.status(404).json({ mensaje: 'Producto no encontrado' });
                } else {
                    res.json(producto); // Si se encuentra, envía el producto como respuesta
                }
            }).catch(e => {
                res.status(500).json({ error: e.message }); // Maneja errores internos del servidor
            });
    });
    
    app.post('/productosP', afa, (req, res) => {
        
        // 1. Manejo de errores de Multer
        if (!req.files || !req.files['img'] || !req.files['ficha_p']) {
          return res.status(400).json({ error: 'No se proporcionaron los archivos necesarios.' });
        }
      
        // 2. Extraer información de las imágenes
        const imgFilename = req.files['img'][0].filename;
        const ficha_pFilename = req.files['ficha_p'][0].filename;
      
        // 3. Construir el objeto del nuevo producto
        const nuevoProducto = {
          ...req.body, // Datos del formulario (nombre, descripción, precio, etc.)
          img: `/uploads/${imgFilename}`, // Ruta de la imagen principal
          ficha_p: `/uploads/${ficha_pFilename}` // Ruta de la ficha técnica
        };
      
        // 4. Guardar en la base de datos
        databaseService.crearProducto(nuevoProducto)
          .then(() => {
            res.json({ mensaje: "Nuevo producto creado con éxito" });
          })
          .catch(e => {
            res.status(500).json({ error: e.message });
          });
    });

    app.delete('/productosP/:id', (req, res) => {
        const { id } = req.params;

        databaseService.eliminarProducto(id)
        .then(() => {
            res.json({"mensaje": "producto eliminado"});
        }).catch(e => {
            res.status(500).json(e);
        });
    });

    app.put('/productosP/:id', (req, res) => {
        const { id } = req.params;
        const updatedProducto = req.body;
    
        databaseService.actualizarProducto({ id, ...updatedProducto })
        .then(() => {
            res.json({"mensaje": "producto actualizado"});
        }).catch(e => {
            console.error("Error updating producto:", e);
            res.status(500).json({ error: "Internal Server Error", details: e });
        });
    });

    //MIEMBROS DE LA EMPRESA

    app.get('/miembrosE',(req, res) =>{
        databaseService.mostrarMiembrosE()
        .then(miembros =>{
            res.json(miembros);
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
    });

    app.post('/miembrosE',(req, res) =>{
        const nuevoMiembro = req.body;
        console.log(nuevoMiembro);

        databaseService.crearMiembroE(nuevoMiembro)
        .then(() => { //despues de la escritura en la bd se muestar el lenguake
            res.json({"mensaje": "nuevo user"});
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
        
    });

    //SLIDER
    
    app.get('/slider', (req, res) => {
        databaseService.mostrarSlider()
        .then(slider => {
            res.json(slider);
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.post('/slider', (req, res) => {
        const newSlider = req.body;
        console.log(newSlider);
        databaseService.crearSlider(newSlider)
        .then(() => {
            res.json({ mensaje: "nuevo slider" });
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.get('/slider/:id', (req, res) => {
        const idslider = req.params.id; // Captura el parámetro ID de la URL
        databaseService.sliderDetalle(idslider) // Llama a la función para buscar por ID
            .then(slider => {
                if (!slider) { // Si no se encuentra el slider
                    res.status(404).json({ mensaje: 'slider no encontrado' });
                } else {
                    res.json(slider); // Si se encuentra, envía el producto como respuesta
                }
            }).catch(e => {
                res.status(500).json({ error: e.message }); // Maneja errores internos del servidor
            });
    });

    //REPUESTOS
    app.get('/repuestos', (req, res) => {
        databaseService.mostrarRepuesto()
        .then(repuesto => {
            res.json(repuesto);
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.post('/repuestos', (req, res) => {
        const newRepuestos = req.body;
        console.log(newRepuestos);
        databaseService.crearRepuesto(newRepuestos)
        .then(() => {
            res.json({ mensaje: "nuevo repuesto" });
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.get('/repuestos/:id', (req, res) => {
        const idRepuesto = req.params.id; // Captura el parámetro ID de la URL
        databaseService.repuestoId(idRepuesto) // Llama a la función para buscar por ID
            .then(repuesto => {
                if (!repuesto) { // Si no se encuentra el repuesto
                    res.status(404).json({ mensaje: 'repuesto no encontrado' });
                } else {
                    res.json(repuesto); // Si se encuentra, envía el producto como respuesta
                }
            }).catch(e => {
                res.status(500).json({ error: e.message }); // Maneja errores internos del servidor
            });
    });

    //contactanos 

    app.get('/contactanos', (req, res) => {
        databaseService.mostrarContactanos()
        .then(mensajeC => {
            res.json(mensajeC);
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.post('/contactanos', (req, res) => {
        const newMensajeC = req.body;
        console.log(newMensajeC);
        databaseService.crearContacto(newMensajeC)
        .then(() => {
            res.json({ mensaje: "Se registro un nuevo mensaje" });
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    //carrito

    app.get('/carrito', (req, res) => {
        databaseService.mostrarCarrito()
        .then(carrito => {
            res.json(carrito);
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });

    app.post('/productosP/carrito', (req, res) => {
        const newCarrito = req.body;
        console.log(newCarrito);
        databaseService.crearCarrito(newCarrito)
        .then(() => {
            res.json({ mensaje: "nuevo carrito" });
        })
        .catch(e => {
            res.status(500).json(e);
        });
    });
    
    app.get('/carrito/:id', (req, res) => {
        const idCarrito = req.params.id; // Captura el parámetro ID de la URL
        databaseService.detalleCarrito(idCarrito) // Llama a la función para buscar por ID
            .then(carrito => {
                if (!carrito) { // Si no se encuentra el carrito
                    res.status(404).json({ mensaje: 'carrito no encontrado' });
                } else {
                    res.json(carrito); // Si se encuentra, envía el producto como respuesta
                }
            }).catch(e => {
                res.status(500).json({ error: e.message }); // Maneja errores internos del servidor
            });
    });

    app.put('/carrito/:id', (req, res) => {
        const idCarrito = req.params.id; // Captura el parámetro ID de la URL
        const updatedCarrito = req.body; // Obtiene los datos actualizados desde el cuerpo de la solicitud
    
        databaseService.actualizarCarrito(idCarrito, updatedCarrito) // Llama a la función para actualizar el carrito
            .then(() => {
                res.json({ mensaje: "carrito actualizado exitosamente" });
            }).catch(e => {
                res.status(500).json({ error: e.message }); // Maneja errores internos del servidor
            });
    });
    


};