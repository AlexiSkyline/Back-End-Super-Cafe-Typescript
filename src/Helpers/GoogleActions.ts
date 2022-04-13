import { OAuth2Client } from 'google-auth-library';

class GoogleActions {
    private static client: OAuth2Client;
    public static async googleVerify( idToken: string ) {
        this.client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

        const ticket = await this.client.verifyIdToken({ 
            idToken, 
            audience: process.env.GOOGLE_CLIENT_ID 
        });

        const { name, picture: img, email }: any = ticket.getPayload();
        
        return { name, img, email };
    } 
}

export default GoogleActions;