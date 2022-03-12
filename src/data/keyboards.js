const keyboards = {
	joinGame: groupId => [
		[
			'buttons.join',
			`t.me/${process.env.BOT_NAME}?start=${groupId}`,
			null,
			true
		]
	],
	targets: (targets, restrictedTargets) =>
		targets.reduce((list, target) => {
			if (!restrictedTargets.includes(target.userId)) {
				list.push([
					'buttons.target',
					`selectTarget_${target.userId}`,
					{ name: target.name }
				])
			}
			return list
		}, []),
	commissionerActions: [
		['buttons.checkRole', `action_checkRole`],
		['buttons.kill', `action_kill`]
	]
}

export { keyboards }
