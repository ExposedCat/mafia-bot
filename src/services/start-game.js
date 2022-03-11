import { generateRoles } from '../helpers/roles-generator.js'
import { startNight } from './game-process/start-night.js'

const isMafia = role => role === 'mafia' || role === 'don'

async function startGame(ctx) {
	const game = await ctx.getGame()
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
	await ctx.db.Player.insertMany(players)
	await game.start('night')
	await startNight(ctx)
}

export { startGame }
