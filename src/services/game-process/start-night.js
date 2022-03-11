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
				response = 'responses.inGame.actions.mafia'
				break
			}
			case 'mafia': {
				response = 'responses.inGame.actions.mafia'
				break
			}
			case 'commissioner': {
				response = 'responses.inGame.actions.commissioner'
				break
			}
			case 'doctor': {
				response = 'responses.inGame.actions.doctor'
				break
			}
			case 'dum': {
				response = 'responses.inGame.actions.bum'
				break
			}
			case 'maniac': {
				response = 'responses.inGame.actions.maniac'
				break
			}
			default: {
				response = 'responses.inGame.actions.peaceful'
			}
		}
		if (response) {
			await message(player.userId, response, {}, keyboard)
		}
	}
}

export { startNight }
