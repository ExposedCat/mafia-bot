const keyboards = {
	joinGame: groupId => [
		[
			'buttons.join',
			`t.me/${process.env.BOT_NAME}?start=${groupId}`,
			null,
			true
		]
	]
}

export { keyboards }
