const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    lat: {
        type: String,
        require: true
    },
    lng: {
        type: String,
        require: true
    },
    departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        require: true
    }
},{ collection: 'hospitales' });


HospitalSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model( 'Hospital', HospitalSchema )