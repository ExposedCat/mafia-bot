async function handleStartCommand(ctx) {
	if (ctx.chat.id !== ctx.from.id) {
		const game = await ctx.getGame()
		if (!game) {
			await ctx.text('errors.gameIsNotCreated')
			return
		}
		await ctx.text('responses.gameState', {
			state: ctx.i18n.t(`components.states.${game.state}`)
		})
	} else {
		const player = await ctx.getPlayer()
		if (player) {
			const game = await ctx.db.Game.getOne(player.chatId)
			if (!game) {
				await ctx.text('errors.unknownError')
				return
			}
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
			const gameId = ctx.startPayload
			if (!gameId) {
				await ctx.text('errors.notInTheGame')
				return
			}
			const game = await ctx.db.Game.getOne(gameId)
			if (!game) {
				await ctx.text('errors.gameNotFound')
				return
			}
			if (game.state !== 'recruiting') {
				await ctx.text('errors.gameIsAlreadyStarted')
				return
			}
			await game.addPlayer(ctx.from.id, ctx.from.first_name)
			await ctx.text('responses.joinedGame')
		}
	}
}

export { handleStartCommand }
