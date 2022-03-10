function get(userId) {
	return this.findOne({ userId })
}

function update(userId, updates) {
	return this.updateOne({ userId }, updates)
}

function getMany(userIds) {
	return this.find({
		userId: {
			$in: userIds
		}
	})
}

export { get, getMany, update }
