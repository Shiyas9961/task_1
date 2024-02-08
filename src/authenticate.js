import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import userpool from './userpool'

export const authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username : email,
            Pool : userpool
        })

        const authenticationDetails = new AuthenticationDetails({
            Username : email,
            Password : password
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess : (result) => {
                //console.log("Login SuccessFully")
                resolve(result)
            },
            onFailure : (err) => {
                //console.log("Login failed", err)
                reject(err)
            }
        })
    })
}