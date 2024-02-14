import userpool from "../userpool"

export const getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
        const cognitoUser = userpool.getCurrentUser()

        if(!cognitoUser){
            reject(new Error("User not found"))
            return
        }

        cognitoUser.getSession((err, session) => {
            if(err){
                reject(err)
                return
            }
            cognitoUser.getUserAttributes((err, attributes) => {
                if(err){
                    reject(err)
                    return
                }
                const userData = attributes.reduce((acc, attribute) => {
                    acc[attribute.Name] = attribute.Value
                    return acc
                }, {})

                resolve({ ...userData, username : cognitoUser.username })
            })
        })
    })
}