import { Column } from 'typeorm';

export class SmartThingsToken {
	@Column({ nullable: true })
	accessUrl: string;

	@Column({ nullable: true })
	authToken: string;
}
