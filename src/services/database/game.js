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
		let response = null
		switch (player.role) {
			case 'don': {
				response = 'responses.inGame.roles.don'
				break
			}
			case 'mafia': {
				response = 'responses.inGame.roles.mafia'
				break
			}
			case 'commissioner': {
				response = 'responses.inGame.roles.commissioner'
				break
			}
			case 'doctor': {
				response = 'responses.inGame.roles.doctor'
				break
			}
			case 'dum': {
				response = 'responses.inGame.roles.bum'
				break
			}
			case 'maniac': {
				response = 'responses.inGame.roles.maniac'
				break
			}
			default: {
				response = 'responses.inGame.roles.peaceful'
			}
		}
		if (response) {
			await notify(ctx, player.userId, ctx.i18n.t(response))
		}
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
