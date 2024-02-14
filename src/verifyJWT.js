import { CognitoJwtVerifier } from "aws-jwt-verify";
import { wrongToken } from "./slices/authSlice";

export const verifyJWT = async (token, dispatch) => {

    const verifier = CognitoJwtVerifier.create({
        userPoolId : 'ap-south-1_EpaEyTR1c',
        tokenUse : 'access',
        clientId : '5e8g13esvnitvpakrp88llqtpj'
    })

    try{
        await verifier.verify(token)
        //console.log(payload)
    }catch(error){
        dispatch(wrongToken(error.message))
        console.log(error)
    }
}