import {expressjwt as jwt} from "express-jwt"

function authJwt(){
    const secret=process.env.JSON_WEB_TOKEN_KEY;
    return jwt({secret:secret,algorithms:["HS256"]});
}
export default authJwt;

