import jwt from 'jsonwebtoken';

class GeneratorJWT {
    public static async generateToken( uid: string ): Promise<string | undefined> {
        return new Promise( ( resolve, reject ) => {
            const payload = { uid };

            jwt.sign( payload, process.env.SECRET_JWT_SEED || 'Secret', {
                expiresIn: '4h'
            }, ( err, token ) => {
                if( err ) {
                    reject( "Error generating token" );
                } else {
                    resolve( token );
                }
            });
        });
    }
}

export default GeneratorJWT;