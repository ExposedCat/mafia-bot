import Telegraf from 'telegraf'

import { showPopup } from '../helpers/show-popup.js'
import { sendMessage } from '../helpers/send-message.js'

class ExtendedContext extends Telegraf.Context {
	constructor(update, telegram, options) {
		super(update, telegram, options)
		this.player = null
		this.game = null
	}

	text(key, data = {}, extra = {}) {
		return sendMessage.bind(this)(this.i18n.t(key, data), extra)
	}

	popup = showPopup

	async getGame() {
		if (this.game === null) {
			this.game = await this.db.Game.getOne(this.chat.id)
		}

		return this.game
	}

	async getPlayer() {
		if (this.player === null) {
			this.player = await this.db.Player.getOne(this.from.id)
		}

		return this.player
	}
}

export { ExtendedContext }
