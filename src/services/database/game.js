function get(groupId) {
	return this.findOne({ groupId })
}

function update(groupId, updates) {
	return this.updateOne({ groupId }, updates)
}

function addPlayer(groupId, userId, userName) {
	return update.bind(this)(groupId, {
		$addToSet: {
			players: {
				userId,
				name: userName
			}
		}
	})
}

function start(groupId) {
	return this.updateOne({ groupId }, { state: 'night' })
}

async function end(groupId) {
	return this.deleteOne({ groupId })
}

export { get, update, start, end, addPlayer }
