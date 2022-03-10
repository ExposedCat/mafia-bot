import Markup from 'telegraf/markup.js'

function keyboard(texts, buttons, columns = 1) {
	return Markup.inlineKeyboard(
		buttons.map(button => {
			const [labelTemplate, data, labelData, isUrl] = button
			const method = isUrl ? 'urlButton' : 'callbackButton'
			const markup = Markup[method]
			const label = texts.t(labelTemplate, labelData || {})
			return markup(label, data)
		}),
		{ columns }
	).extra()
}

export { keyboard }
