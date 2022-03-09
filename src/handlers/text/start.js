import { start as processCommand } from '../../services/start-command.js'

async function handleStartCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		console.log(game)
		if (game) {
			await ctx.text(`Game on state ${game.state}`)
		} else {
			await ctx.text(`Game not started`)
		}
	} else {
		const player = await ctx.getPlayer()
		console.log(player)
		if (player.chatId) {
			const game = await ctx.db.Game.getOne(player.chatId)
			console.log(game)
			if (game) {
				await ctx.text(`Game on state ${game.state}`)
				await ctx.text(`Player ${player.role} - ${player.isAlive}`)
			} else {
				await ctx.text(`Game not started (?!)`)
			}
		} else {
			await ctx.text(`Player is not in the game`)
		}
	}

	const { text } = await processCommand(ctx.i18n)
	await ctx.text(text)
}

export { handleStartCommand }
