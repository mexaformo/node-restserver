
const mongoose          = require('mongoose');
const uniqueValidator   = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);

let rolesValidos = {
    values: [ 'ADMIN_ROLES', 'USER_ROLE', 'SUPER_ROLE'],
    message: '{VALUE} no es un role válido.'
}

const Schema = mongoose.Schema;

const usuarioSchema = new Schema( {
    nombre: {
        type: String,
        required: [true, 'Campo requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
        
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
} );



// Para modificar los métodos asociados al trabajo del objeto y el schema.
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin( uniqueValidator, '{PATH} debe ser único' );

module.exports = mongoose.model( 'Usuario', usuarioSchema );


