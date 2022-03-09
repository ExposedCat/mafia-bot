// import { start as processCommand } from '../../services/start-command.js'

async function handleEndGameCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		console.log(game)
		if (game) {
			await game.end()
		} else {
			await ctx.text(`Game not started`)
		}
	} else {
		await ctx.text(`Can't end game in PM`)
	}

	// const { text } = await processCommand(ctx.i18n)
	// await ctx.text(text)
}

export { handleEndGameCommand }
