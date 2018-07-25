import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Token {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column()
	access: string;
}
