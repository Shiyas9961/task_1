import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId : 'ap-south-1_EpaEyTR1c',
    ClientId : '5e8g13esvnitvpakrp88llqtpj'
}

const userpool = new CognitoUserPool(poolData)

export default userpool