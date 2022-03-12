import { notify } from '../../helpers/notify.js'

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

async function start(groupId, playerIds, ctx, state) {
	const players = await ctx.db.Player.getMany(playerIds)

	for (const player of players) {
		await notify(
			ctx,
			player.userId,
			ctx.i18n.t(`responses.inGame.roles.${player.role}`)
		)
	}

	return this.updateOne({ groupId }, { state })
}

function end(groupId) {
	return this.deleteOne({ groupId })
}

function findPlayerGame(userId) {
	return this.findOne({
		'players.userId': userId
	})
}

export { get, update, start, end, addPlayer, findPlayerGame }
