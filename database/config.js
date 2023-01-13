const mongoose = require('mongoose');

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log('BD Conectada');
    }catch(error){
        console.log(error);
        throw new Error('Error al conectar a BD');
    }
}

module.exports = {
    dbConnection
}