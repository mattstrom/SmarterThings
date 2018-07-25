import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';
import { SmartThingsToken } from '../entities';

@Entity()
export class Server {
	@ObjectIdColumn()
	_id: ObjectID;

	@Column({ default: 'localhost:4567' })
	serverId: string;

	@Column({ default: false })
	connected: boolean;

	@Column({ default: [] })
	token: SmartThingsToken[];

	@Column({ default: [] })
	clients: string[] = [];
}
