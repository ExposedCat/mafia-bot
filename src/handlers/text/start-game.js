import { keyboards } from '../../data/keyboards.js'
import { keyboard } from '../../helpers/keyboard.js'
import { createGame } from '../../services/create-game.js'
import { startGame } from '../../services/start-game.js'

async function handleStartGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			if (game.players.length >= 7) {
				await startGame(game, ctx.db)
				await ctx.text('responses.gameStarted')
			} else {
				await game.end(ctx.db)
				await ctx.text('errors.notEnoughPlayers', {
					players: game.players.length,
					minimum: 7
				})
			}
		} else {
			await createGame(ctx.db, ctx.chat.id)
			await ctx.text(
				'responses.gameCreated',
				{},
				keyboard(ctx.i18n, keyboards.joinGame(ctx.chat.id))
			)
		}
	} else {
		await ctx.text('errors.cantStartInPM')
	}
}

export { handleStartGameCommand }
