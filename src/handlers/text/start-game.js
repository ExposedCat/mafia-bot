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
			await ctx.text('responses.gameCreated')
		}
	} else {
		await ctx.text('errors.cantStartInPM')
	}
}

export { handleStartGameCommand }
