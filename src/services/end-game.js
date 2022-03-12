async function endGame(game, Player) {
	const playerIds = game.players.map(player => player.userId)
	await Player.deleteMany({
		userId: {
			$in: playerIds
		}
	})
}

export { endGame }
