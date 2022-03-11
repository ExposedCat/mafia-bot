import { notify } from '../../helpers/notify.js'

async function startNight(ctx) {
	const message = (chatId, text, data = {}, keyboard) =>
		notify(ctx, chatId, ctx.i18n.t(text, data), keyboard)

	const game = await ctx.getGame()
	await message(game.groupId, 'responses.inGame.nightStarted')
	const players = await ctx.db.Player.getMany(
		game.players.map(player => player.userId)
	)
	for (const player of players) {
		let response = null
		let keyboard = {}
		switch (player.role) {
			case 'don': {
				response = 'responses.inGame.mafiaAction'
				break
			}
			case 'mafia': {
				response = 'responses.inGame.mafiaAction'
				break
			}
			case 'commissioner': {
				response = 'responses.inGame.commissionerAction'
				break
			}
			case 'doctor': {
				response = 'responses.inGame.doctorAction'
				break
			}
			case 'dum': {
				response = 'responses.inGame.bumAction'
				break
			}
			case 'maniac': {
				response = 'responses.inGame.maniacAction'
				break
			}
			default: {
				response = 'responses.inGame.peacefulAction'
			}
		}
		if (response) {
			await message(player.userId, response, {}, keyboard)
		}
	}
}

export { startNight }
