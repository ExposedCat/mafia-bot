import { endGame } from '../../services/end-game.js'

async function handleEndGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			const winners = await endGame(game, ctx.db.Player)
			await ctx.text('responses.gameEnded', {
				winners: ctx.i18n.t(`components.winners.${winners}`)
			})
		} else {
			await ctx.text('errors.unknownCommand')
		}
	} else {
		await ctx.text('errors.cantEndInPM')
	}
}

export { handleEndGameCommand }
