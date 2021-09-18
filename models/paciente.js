const { Schema, model } = require('mongoose');

const PacienteSchema = Schema({

    nombres: {
        type: String,
        required: true,
    },
    apellidos:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
});


PacienteSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model( 'Paciente', PacienteSchema )