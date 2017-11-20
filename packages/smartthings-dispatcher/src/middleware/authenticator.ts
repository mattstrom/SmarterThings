import * as passport from 'passport';

export const authenticator = passport.authenticate('jwt', {
	session: false,
	failureRedirect: '/login'
});
