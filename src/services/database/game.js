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

async function checkStatus(Player) {
	const playerIds = this.players.map(player => player.userId)
	const players = await Player.getMany(playerIds)

	let peacefulAlive = false
	let mafiaAlive = false
	for (const player of players) {
		if (player.isAlive) {
			if (player.isMafia) {
				mafiaAlive = true
				if (peacefulAlive) {
					break
				}
			} else {
				peacefulAlive = true
				if (mafiaAlive) {
					break
				}
			}
		}
	}

	return {
		end: !peacefulAlive || !mafiaAlive,
		winners: peacefulAlive ? 'peaceful' : 'mafia'
	}
}

export { get, update, start, end, addPlayer, findPlayerGame, checkStatus }
