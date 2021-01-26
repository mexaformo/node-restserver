const express       = require('express');
const bcrypt        = require('bcrypt');
const app           = express();
const _             = require( 'underscore' );


// Defino el objeto de Mongoose.
const Usuario       = require('../models/usuario')

app.get('/usuario', (req, res ) => {
    let desde = req.query.desde || 0;
    desde = Number( desde );

    let limite = req.query.limite || 5;
    limite = Number( limite )

    // Se establecen también los campos que se desean devolver.
    Usuario.find( { estado: true }, 'nombre role estado email google img')
        .skip( desde )
        .limit( 5 )
        .exec( ( err, usuarios ) => {

            if( err ) {
                return res.status( 400 ).json( {
                    ok: false,
                    err
                } );
            }

            Usuario.count( { estado: true }, ( err, conteo ) => {
                res.json( {
                    ok: true, 
                    cuantos: conteo,
                    usuarios,
                } );

            });
            

        } );

} );


app.post('/usuario', (req, res ) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ),
        role: body.role
    });

    usuario.save( ( err, usuarioDB ) => {
        
        if( err ) {
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
} );

app.put('/usuario/:id', (req, res ) => {
    // obtenemos el id.
    let id      = req.params.id;

    // Libreria underscore que complementa funcionalidad de JS.
    // Este método devuelve un objeto con solo los campos incluidos
    // en el arrat.
    let body    = _.pick( req.body, [
        'nombre',
        'email',
        'img',
        'role', 
        'estado'
    ] );

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, ( err, usuarioDB ) => {
        if ( err ) {
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        res.json( {
            ok: true,
            usuario: usuarioDB
        } );
        
    });

} );

app.delete('/usuario/:id', (req, res ) => {
    let id = req.params.id;

    let elEstado  = {

        estado: false,
    }; 

    Usuario.findByIdAndUpdate( id, elEstado, { new: true, runValidators: true }, ( err, usuarioDB ) => {

        if ( err ) {
            return res.status( 400 ).json( {
                ok: false,
                err
            } );
        }

        res.json( {
            ok: true,
            usuario: usuarioDB
        } );
        
    });

} );

// Eliminación física del registro.
// app.delete('/usuario/:id', (req, res ) => {
//     let id = req.params.id;
//     Usuario.findByIdAndRemove( id, ( err, usuarioBorrado ) => {

//         if ( err ) {
//             return res.status( 400 ).json( {
//                 ok: false,
//                 err
//             } );
//         }
//         console.log( usuarioBorrado );
//         if ( ! usuarioBorrado ) {
//             return res.status( 400 ).json( {
//                 ok: false,
//                 err: {
//                     message: 'Usuario no encontrado',
//                 }
//             } );            
//         }

//         res.json({
//             ok: true, 
//             usuario: usuarioBorrado,
//         });

//     });

// } );

// app.update('/usuario', (req, res ) => {
//     res.send('Hola Mundo');
// } );

module.exports = app;

