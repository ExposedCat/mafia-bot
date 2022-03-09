function get(groupId) {
	return this.findOneAndUpdate(
		{ groupId },
		{},
		{
			new: true,
			upsert: true,
			setDefaultsOnInsert: true
		}
	)
}

function update(groupId, updates) {
	return this.updateOne({ groupId }, updates)
}

function start(groupId) {
	return this.updateOne({ groupId }, {
		state: 'night'
	})
}

function end(groupId) {
	return this.deleteOne({ groupId })
}

export { get, update, start, end }
