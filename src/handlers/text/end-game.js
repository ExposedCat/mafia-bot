import { endGame } from '../../services/end-game.js'

async function handleEndGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			if (game.state === 'recruiting') {
				await ctx.text('responses.gameStopped')
			} else {
				const { winners } = await game.checkStatus(ctx.db.Player)
				await endGame(game, ctx.db.Player)
				await ctx.text('responses.gameEnded', {
					winners: ctx.i18n.t(`components.winners.${winners}`)
				})
			}
			await game.end()
		} else {
			await ctx.text('errors.gameIsNotCreated')
		}
	} else {
		await ctx.text('errors.cantEndInPM')
	}
}

export { handleEndGameCommand }
