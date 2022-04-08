import { verify } from 'jsonwebtoken';

const verifyToken = (token, secretOrPublicKey) => verify(token, secretOrPublicKey);

export default verifyToken;
