import mongoose from 'mongoose';

const dbConnection = async() => {
    const DB_CNN: string = process.env.DB_CNN || 'mongodb://localhost/test';
    
    mongoose.connect( DB_CNN, ( error ) => {
        if( error ) {
            console.log(error);
            process.exit(1);
        }
        console.log( 'DB Online' );
    });
}

export default dbConnection;
