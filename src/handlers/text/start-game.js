import { keyboards } from '../../data/keyboards.js'
import { keyboard } from '../../helpers/keyboard.js'
import { createGame } from '../../services/create-game.js'
import { startGame } from '../../services/start-game.js'

async function handleStartGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			if (game.state !== 'recruiting') {
				await ctx.text('errors.gameIsAlreadyStarted')
				return
			}
			if (game.players.length >= 7) {
				await ctx.text('responses.gameStarted')
				await startGame(ctx)
			} else {
				await game.end()
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
