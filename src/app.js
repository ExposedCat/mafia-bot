import { path } from './helpers/path-resolver.js'
import { config as setConfigFile } from 'dotenv'

import { initDatabaseConnection } from './config/database/database.js'
import { initBot } from './config/bot.js'

setConfigFile({
	path: path(import.meta.url, 'config.env')
})

let db = initDatabaseConnection()
const bot = await initBot(db)
db = null

bot.launch()

// await bot.context.db.Game.deleteMany()
// await bot.context.db.Player.deleteMany()

console.info('App started')
