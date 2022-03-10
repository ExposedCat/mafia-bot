async function endGame(game, Player) {
	const playerIds = game.players.map(player => player.userId)
	const players = await Player.getMany(playerIds)
	const mafiaAlive = players.some(player => player.isMafia)
	const winners = mafiaAlive ? 'mafia' : 'peaceful'
	await Player.deleteMany({
		userId: {
			$in: playerIds
		}
	})
	return winners
}

export { endGame }
