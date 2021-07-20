const BASEURL = process.env.REACT_APP_COMPANY_API
const BASEURL_TERMS = process.env.REACT_APP_TALENT_API

const COMPANY = {
	API: BASEURL,

	SKILLS: {
		skills: `${BASEURL}/search-skill`,
	},

	AUTH: {
		// POST
		login: `${BASEURL}/login`,
		loginExternal: `${BASEURL}/login-external`,
		update: `${BASEURL}/update`,
		register: `${BASEURL}/register`,
		logout: `${BASEURL}/logout`,

		//GET
		user: `${BASEURL}/user`,

		//RESET
		reset: `${BASEURL}/user/resetPassword`,
		pin: `${BASEURL}/user/pinIsValid`,
		change: `${BASEURL}/user/changePassword`,
	},

	DASHBOARD: {
		// GET
		dashboard: `${BASEURL}/dashboard`,
		badges: `${BASEURL}/dashboard/badges`,
		finished_challenges: `${BASEURL}/dashboard/finished_challenges`,
		my_challenges: `${BASEURL}/dashboard/my_challenges`,
		feedbacks: `${BASEURL}/dashboard/feedbacks`,
		challenges: `${BASEURL}/dashboard/challenges`,
	},

	CHALLENGES: {
		challenges: `${BASEURL}/challenges`,
		challenge: (id) => `${BASEURL}/challenge/${id}`,
		trail: (id) => `${BASEURL}/trail/${id}`,
		trail_premium: (id) => `${BASEURL}/trail_premium/${id}`,
		feedback: (id) => `${BASEURL}/feedback/${id}`,
		users: (id) => `${BASEURL}/challenge/users/${id}`,
		create: `${BASEURL}/challenge/store`,
		deleteMaterial: (id) => `${BASEURL}/material/delete/${id}`,
	},

	PROJECT: {
		edit: (id) => `${BASEURL}/project/edit/${id}`,
		store: `${BASEURL}/project/store`,
		update: (id) => `${BASEURL}/project/update/${id}`,
		project: (id, project_id) => `${BASEURL}/challenge/project/${id}/${project_id}`,
	},

	PROJECTS: {
		projects: (id) => `${BASEURL}/challenge/projects/${id}`,
	},

	TEAM: {
		search: (id, query) => `${BASEURL}/team/search/${id}?name=${query}`,
		teams: (id) => `${BASEURL}/challenge/${id}/teams`,
		my_invites: `${BASEURL}/team/my_invites`,
		invite: (id) => `${BASEURL}/team/invite/${id}`,
		kick: (id) => `${BASEURL}/team/kickout/${id}`,
		leave: (id) => `${BASEURL}/team/leave/${id}`,
		transfer: (id) => `${BASEURL}/team/give-leadership/${id}`,
	},

	TRAIL: {
		normal: (id) => `${BASEURL}/trail/${id}`,
		premium: (id) => `${BASEURL}/trail_premium/${id}`,
		question: (id, type) => `${BASEURL}/question/${id}/${type}`,
		answer: (id, type) => `${BASEURL}/question/answer/${id}/${type}`,
		video: (id, type) => `${BASEURL}/video/${id}/${type}`,
		material: (id, type) => `${BASEURL}/material/${id}/${type}`,
		createVideo: (id) => `${BASEURL}/challenge/trail/${id}/video`,
		createQuestion: (id) => `${BASEURL}/challenge/trail/${id}/question`,
		createMaterial: (id) => `${BASEURL}/challenge/trail/${id}/material`,
	},

	FORUM: {
		forum: (id) => `${BASEURL}/forum/${id}`,
		publication: (id) => `${BASEURL}/forum-get/${id}`,
		create: `${BASEURL}/forum/create`,
		comment: `${BASEURL}/forum/comment`,
	},

	FEEDBACK: {
		comment: (challenge_id, project_id) =>
			`${BASEURL}/mentor/challenge/${challenge_id}/project/${project_id}/feedback/comment`,
		create: (challenge_id, project_id) =>
			`${BASEURL}/mentor/challenge/${challenge_id}/project/${project_id}/feedback/send`,
		get: (challenge_id, project_id) =>
			`${BASEURL}/mentor/challenge/${challenge_id}/project/${project_id}/feedbacks`,
		getOne: (challenge_id, feedback_id) =>
			`${BASEURL}/mentor/feedback/${challenge_id}/${feedback_id}`,
	},

	TERMS: {
		terms: `${BASEURL_TERMS}/terms-of-use`,
	},

	NOTIFICATIONS: {
		unread: `${BASEURL}/notifications/unread`,
		all: `${BASEURL}/notifications/all`,
		readAll: `${BASEURL}/notifications/read`,
		readOne: `${BASEURL}/notifications/read-one`,
	},

	INVITES: {
		invites: `${BASEURL}/team/my_invites`,
		accept: (id) => `${BASEURL}/team/accept/${id}`,
		refuse: (id) => `${BASEURL}/team/refuse/${id}`,
	},
}

export { COMPANY }
