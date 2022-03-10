import { shuffleArray } from './random.js'

const optionalRoles = [
	[8, 'lucky'],
	[9, 'suicide'],
	[10, 'bum'],
	[11, 'maniac']
]

function generateRoles(playersNumber) {
	let index = 3
	// Init with peaceful
	let roles = new Array(playersNumber).fill('peaceful')
	// Base roles
	roles[0] = 'don'
	roles[1] = 'commissioner'
	roles[2] = 'doctor'
	// Mafias
	const mafia = ((playersNumber / 4) | 0) - 1
	let lastMafia = mafia + index
	for (; index < lastMafia; ++index) {
		roles[index] = 'mafia'
	}
	// Optional roles
	for (let [number, role] of optionalRoles) {
		if (playersNumber >= number) {
			roles[++index] = role
		}
	}

	shuffleArray(roles)
	return roles
}

export { generateRoles }
