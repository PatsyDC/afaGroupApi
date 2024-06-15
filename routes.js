module.exports = function(app, databaseService){

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


};