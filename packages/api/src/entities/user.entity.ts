import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Token } from './token.entity';

@Entity()
export class User {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column(() => Token)
	tokens: Token[];
}
