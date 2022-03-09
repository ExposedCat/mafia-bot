import { get, update } from '../services/database/player.js'
import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
	userId: {
		type: Number,
		unique: true,
		required: true
	},
	chatId: {
		type: Number
	},
	name: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true,
		default: 'peaceful'
	},
	isAlive: {
		type: Boolean,
		required: true,
		default: true
	},
	restrictedTargets: {
		type: [Number],
		required: true,
		default: []
	},
	sentAfterDeath: {
		type: Boolean,
		required: true,
		default: false
	}
})

class playerClass {
	static getOne(userId, name) {
		return get.bind(this)(userId, name)
	}

	updateData(updates) {
		return update.bind(this.contructor)(this.userId, updates)
	}
}

export { playerClass, playerSchema }
