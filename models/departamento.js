const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema({

    nombre: {
        type: String,
        required: true,
    }
    
});


DepartamentoSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
});

module.exports = model( 'Departamento', DepartamentoSchema )