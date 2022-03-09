import { get, update, start, end } from '../services/database/game.js'
import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
	groupId: {
		type: Number,
		unique: true,
		required: true
	},
	players: {
		type: [Number],
		required: true,
		default: []
	},
	state: {
		type: String,
		required: true,
		default: 'stopped'
	},
	night: {
		type: {
			killed: [Number],
			healed: Number
		}
	},
	day: {
		type: {
			targetId: Number,
			up: [Number],
			down: [Number]
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

	start() {
		return start.bind(this.constructor)(this.groupId)
	}

	end() {
		return end.bind(this.constructor)(this.groupId)
	}
}

export { gameClass, gameSchema }
