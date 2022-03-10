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
	return this.updateOne(
		{ groupId },
		{
			state: 'night'
		}
	)
}

async function end(groupId, Player) {
	await Player.deleteMany({
		userId: {
			$in: this.players
		}
	})
	return this.deleteOne({ groupId })
}

export { get, update, start, end }
