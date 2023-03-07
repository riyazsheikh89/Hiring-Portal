import JWT from 'passport-jwt';
import User from '../models/user.js';

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const ops = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_SECRET_KEY}`
}

export const passportAuth = (passport) => {
    try {
        passport.use(new JwtStrategy(ops, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if(!user) {
                done(null, false);
            } else {
                done(null, user);
            }
        }))
    } catch (error) {
        throw error;
    }
} 