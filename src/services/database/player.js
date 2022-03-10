function get(userId) {
	if (typeof userId === 'number') {
		return this.findOne({ userId })
	} else {
		return this.find({
			userId: {
				$in: userId
			}
		})
	}
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
