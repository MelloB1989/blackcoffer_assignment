export type AmplifyDependentResourcesAttributes = {
    "function": {
        "blackcoffer": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "blackcofferassignmen": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "blackcoffer": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}