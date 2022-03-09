import { any as processClick } from '../../services/any-click.js'

async function handleAnyButtonClick(ctx) {
	const { data } = ctx.callbackQuery

	const { text } = await processClick(data)
	await ctx.popup(text)
}

export { handleAnyButtonClick }
