import { Component, OnInit } from '@angular/core';


export interface User {
	name: string;
	type: string;
	code: string;
	enabled: boolean;
}

const USER_DATA: User[] = [
	{ name: 'Matt', type: 'Admin', code: '●●●●', enabled: true },
];

@Component({
	selector: 'smt-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	displayedColumns: string[] = ['name', 'type', 'code', 'enabled', 'controls'];
	dataSource = USER_DATA;

	constructor() {
	}

	ngOnInit() {
	}

}
