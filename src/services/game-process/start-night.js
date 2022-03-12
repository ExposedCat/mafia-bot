import { notify } from '../../helpers/notify.js'
import { keyboard as makeKeyboard } from '../../helpers/keyboard.js'
import { keyboards } from '../../data/keyboards.js'

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
			case 'commissioner': {
				response = 'responses.inGame.actions.commissioner'
				keyboard = makeKeyboard(ctx.i18n, keyboards.commissionerActions)
				break
			}
			case 'lucky':
			case 'peaceful':
			case 'suicide': {
				response = 'responses.inGame.actions.peaceful'
				break
			}
			default: {
				response = `responses.inGame.actions.${player.role}`
				keyboard = makeKeyboard(
					ctx.i18n,
					keyboards.targets(players, player.restrictedTargets)
				)
			}
		}
		await message(player.userId, response, {}, keyboard)
	}
}

export { startNight }
