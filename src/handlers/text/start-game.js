import { startGame } from '../../services/start-game.js'

async function handleStartGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			if (game.players.length >= 5) {
				await startGame(game, ctx.db)
			} else {
				await game.end(ctx.db)
				await ctx.text('errors.notEnoughPlayers', {
					players: game.players.length,
					minimum: 5
				})
			}
		} else {
			await ctx.text('errors.unknownError')
		}
	} else {
		await ctx.text('errors.cantStartInPM')
	}
}

export { handleStartGameCommand }
