import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
/*
    * is a class that contains all the methods to validate the data sent by the user 
    * @Class: ValidateInput
*/
class ValidateInput {
    /*
        * Validate if some error in the request, wearing express-validator
        * @method: validateFields
        * @params req: AnySchema - mistakes in the request
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static validateFields( req: Request, res: Response, next: NextFunction ): Response | void {
        const errors = validationResult( req );
        if( !errors.isEmpty() ) {
            return res.status(400).json( errors );
        }

        next();
    }

    /*
        * Validate if the user send the file
        * @method: validateFile
        * @params req: File - file send by the user
        * @params res: Response - return the response with the status and the message
        * @params next: NextFunction - call the next function
    */
    public static validateFile( req: any, res: Response, next: NextFunction ): Response | void {
        if( !req.files || Object.keys( req.files ).length === 0 || !req.files.archive ) {
            return res.status(400).json({
                ok: false,
                message: 'There are no files to upload - validateFile'
            });
        }

        next();
    }
}

export default ValidateInput;