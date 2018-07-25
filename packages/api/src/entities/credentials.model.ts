import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';


export class Credentials {

	@IsEmail()
	email: string;

	@MinLength(8)
	password: string;
}
