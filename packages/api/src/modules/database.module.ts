import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import appRoot from 'app-root-path';


@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqljs',
			location: `${appRoot}/data/main.dat`,
			autoSave: true,
			entities: [
				__dirname + '/../entities/**/*.entity{.ts,.js}',
			],
			logging: false,
			synchronize: true
		})
	]
})
export class DatabaseModule {}
