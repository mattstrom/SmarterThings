import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	access: string;

	@ManyToOne(() => User)
	user: User;
}
