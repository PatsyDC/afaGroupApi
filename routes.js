module.exports = function(app, databaseService){

    app.get('/', (req, res) =>{
        res.json({"mensaje": "hi"});
    });

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
    

    app.post('/productosP',(req, res) =>{
        const nuevoProducto = req.body;
        console.log(nuevoProducto);

        databaseService.crearProducto(nuevoProducto)
        .then(() => { //despues de la escritura en la bd se muestar el lenguake
            res.json({"mensaje": "nuevo producto"});
        }).catch(e => { // corregido
            res.status(500).json(e);
        });
        
    })
};