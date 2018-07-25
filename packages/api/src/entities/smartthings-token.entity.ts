import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class SmartThingsToken {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column()
	accessUrl: string;

	@Column()
	authToken: string;
}
