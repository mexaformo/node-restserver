require( './config/config' );

const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res ) => {
    res.send('get Usuario');
} );

app.post('/usuario', (req, res ) => {
    let body = req.body;

    if ( body.nombre == undefined ) {
        res.status( 400 ).json(
            {
                ok: false,
                mensaje: 'El nombre está vacío.',
            
            }
        );

    } else {
        res.json({
            persona: body
        });
    }
} );

app.put('/usuario/:id', (req, res ) => {
    let id = req.params.id;
    res.json( {
        id
    } );
} );

app.delete('/usuario', (req, res ) => {
    res.send('Hola Mundo');
} );

// app.update('/usuario', (req, res ) => {
//     res.send('Hola Mundo');
// } );

app.listen( process.env.PORT, () => {
    console.log( `Escuchando en el puerto ${ process.env.PORT }`);
} );

