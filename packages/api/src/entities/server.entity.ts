import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SmartThingsToken } from '../entities';

@Entity()
export class Server {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 'localhost:4567' })
	serverId: string;

	@Column({ default: false })
	connected: boolean;

	@Column(() => SmartThingsToken)
	token: SmartThingsToken;

	@Column('simple-json', { default: '[]' })
	clients: string[];
}
