import { generateRoles } from '../helpers/roles-generator.js'

const isMafia = role => role === 'mafia' || role === 'don'

async function startGame(game, db) {
	const roles = generateRoles(game.players.length)
	let mafiaIds = []
	const players = game.players.map((userData, index) => {
		const role = roles[index]
		let player = {
			role,
			name: userData.name,
			chatId: game.groupId,
			restrictedTargets: [],
			isMafia: isMafia(role),
			userId: userData.userId
		}
		if (player.isMafia) {
			mafiaIds.push(userData.userId)
			player.restrictedTargets = mafiaIds
		}
        return player
	})
	await db.Player.insertMany(players)
	await game.start()
}

export { startGame }
