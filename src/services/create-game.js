function createGame(db, groupId) {
	return db.Game.create({ groupId })
}

export { createGame }
