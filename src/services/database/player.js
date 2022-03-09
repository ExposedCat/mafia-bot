function get(userId, name) {
	return this.findOneAndUpdate(
		{ userId },
		{ name },
		{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true
		}
	)
}

function update(userId, updates) {
	return this.updateOne({ userId }, updates)
}

export { get, update }