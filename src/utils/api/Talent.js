const BASEURL = "http://104.131.46.30/api";

const TALENT = {
  API: BASEURL,

  AUTH: {
    // POST
    login: `${BASEURL}/login`,
    update: `${BASEURL}/user/update`,
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
    talent: `${BASEURL}/dashboard`,
    badges: `${BASEURL}/dashboard/badges`,
    finished_challenges: `${BASEURL}/dashboard/finished_challenges`,
    my_challenges: `${BASEURL}/dashboard/my_challenges`,
    feedbacks: `${BASEURL}/dashboard/feedbacks`,
    challenges: `${BASEURL}/dashboard/challenges`,
  },

  CHALLENGES: {
    // GET
    my_challenges: `${BASEURL}/my_challenges`,
    challenges: `${BASEURL}/challenges`,
    challenge: (id) => `${BASEURL}/challenge/${id}`,
    trail: (id) => `${BASEURL}/trail/${id}`,
    trail_premium: (id) => `${BASEURL}/trail_premium/${id}`,
    project: (id) => `${BASEURL}/project/${id}`,
    feedback: (id) => `${BASEURL}/feedback/${id}`,
    badges: `${BASEURL}/dashboard/badges`,
    subscribe: (id) => `${BASEURL}/challenge/subscribe/${id}`,
  },

  PROJECT: {
    project: (id) => `${BASEURL}/project/${id}`,
    edit: (id) => `${BASEURL}/project/edit/${id}`,
    store: `${BASEURL}/project/store`,
    update: (id) => `${BASEURL}/project/update/${id}`,
  },

  TEAM: {
    search: (id, query) => `${BASEURL}/team/search/${id}?name=${query}`,
    my_invites: `${BASEURL}/team/my_invites`,
    invite: (id) => `${BASEURL}/team/invite/${id}`,
  },
};

export { TALENT };
