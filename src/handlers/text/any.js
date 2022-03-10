async function handleAnyTextMessage(ctx) {
	if (ctx.chat.id === ctx.from.id) {
		await ctx.text('errors.unknownCommand')
	}
}

export { handleAnyTextMessage }
