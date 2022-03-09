import { any as processCommand } from '../../services/any-message.js'

async function handleAnyTextMessage(ctx) {
	const { text: responseText } = await processCommand(ctx.i18n)
	await ctx.text(responseText)
}

export { handleAnyTextMessage }
