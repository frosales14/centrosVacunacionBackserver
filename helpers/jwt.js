

const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {
    
    return new Promise( (resolve, reject) => { 

        const payload = {
            uid
        }
    
        jwt.sign( payload,  process.env.TOKEN_SECRET, {
            expiresIn: '12h'
        }, (err,token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el TOKEN');
            } else{
                resolve( token )
            }
        });

    });
    
}

module.exports = {
    generarJWT,
}