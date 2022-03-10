import {
	get,
	end,
	start,
	update,
	addPlayer
} from '../services/database/game.js'
import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
	groupId: {
		type: Number,
		unique: true,
		required: true
	},
	players: {
		type: [
			{
				name: String,
				userId: Number
			}
		],
		required: true,
		default: [
			// For testing. FIXME: Remove
			// { name: 'test1', userId: 1 },
			// { name: 'test2', userId: 2 },
			// { name: 'test3', userId: 849670500 },
			// { name: 'test4', userId: 4 },
			// { name: 'test5', userId: 5 },
			// { name: 'test6', userId: 6 },
			// { name: 'test7', userId: 7 },
			// { name: 'test8', userId: 8 },
			// { name: 'test9', userId: 9 },
			// { name: 'test10', userId: 10 },
			// { name: 'test11', userId: 11 },
			// { name: 'test12', userId: 12 }
		]
	},
	state: {
		type: String,
		required: true,
		default: 'recruiting'
	},
	night: {
		type: {
			killed: [Number],
			healed: Number
		},
		required: true,
		default: {
			killed: [],
			healed: null
		}
	},
	day: {
		type: {
			targetId: Number,
			up: [Number],
			down: [Number]
		},
		required: true,
		default: {
			targetId: null,
			up: [],
			down: []
		}
	}
})

class gameClass {
	static getOne(groupId) {
		return get.bind(this)(groupId)
	}

	updateData(updates) {
		return update.bind(this.constructor)(this.groupId, updates)
	}

	addPlayer(userId, name) {
		return addPlayer.bind(this.constructor)(this.groupId, userId, name)
	}

	start() {
		return start.bind(this.constructor)(this.groupId)
	}

	end(Player) {
		return end.bind(this.constructor)(this.groupId, Player)
	}
}

export { gameClass, gameSchema }
