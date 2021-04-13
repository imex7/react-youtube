const fake_users = [
	{
		id: '1',
		name: 'Dima',
		password: 123,
	},
	{
		id: '2',
		name: 'Petya',
		password: 123
	},
	{
		id: '3',
		name: 'Vasya',
		password: 123
	},
];

export function getAllUsers() {
	return fake_users;
}

export function getUserByNameAndPassword({login, password}) {
	const user = fake_users.find((el) => {
		return el.name === login && el.password === Number(password)
	});
	// console.log(login, password)
	return new Promise((res, rej) => {
		if (user) {
			setTimeout(() => {
				res(user)
			}, 3000)
		} else {
			setTimeout(() => {
				rej("No user found")
			}, 3000)
		}
	})
}

export const getUserByNameAndPassword2 = async (login, psw) => {
	const data = await getUserByNameAndPassword(login, psw)
	return data
}

export function getUserByNameAndPassword3(login, psw) {
	return fake_users.find((el) => {
		return el.name === login && el.password === Number(psw)
	});
}


