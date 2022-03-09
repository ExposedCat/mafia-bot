import { playerClass, playerSchema } from '../../entities/player.js'
import { gameClass, gameSchema } from '../../entities/game.js'

import mongoose from 'mongoose'

function initEntityModel(name, entitySchema, entityClass) {
	entitySchema.loadClass(entityClass)
	const Model = new mongoose.model(name, entitySchema)
	return Model
}

function initModels() {
	return {
		Player: initEntityModel('Player', playerSchema, playerClass),
		Game: initEntityModel('Game', gameSchema, gameClass)
	}
}

export { initModels }
