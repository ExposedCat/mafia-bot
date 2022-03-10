async function handleStartCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (game) {
			await ctx.text('responses.gameState', {
				state: ctx.i18n.t(`components.states.${game.state}`)
			})
		} else {
			await ctx.text('errors.unknownError')
		}
	} else {
		const player = await ctx.getPlayer()
		if (player) {
			const game = await ctx.db.Game.getOne(player.chatId)
			if (game) {
				await ctx.text('responses.gameState', {
					state: ctx.i18n.t(`components.states.${game.state}`)
				})
				await ctx.text('responses.player', {
					name: player.name,
					role: ctx.i18n.t(`components.roles.${player.role}`),
					isAlive: ctx.i18n.t(
						`components.boolean.${player.isAlive ? 'yes' : 'no'}`
					)
				})
			} else {
				await ctx.text('errors.unknownError')
			}
		} else {
			await ctx.text('errors.notInTheGame')
		}
	}
}

export { handleStartCommand }
