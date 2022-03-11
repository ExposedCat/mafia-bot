import { sendMessage } from './send-message.js'

async function notify(ctx, chatId, text, extra = {}) {
	extra.chatId = chatId
	try {
		const message = await sendMessage.bind(ctx)(text, extra)
		return {
			error: false,
			message
		}
	} catch (error) {
		return {
			error: true,
			message: null
		}
	}
}

export { notify }
