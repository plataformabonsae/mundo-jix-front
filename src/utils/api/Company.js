const BASEURL = "http://104.131.46.30/api/company";

const COMPANY = {
  API: BASEURL,

  AUTH: {
    // POST
    login: `${BASEURL}/login`,
    update: `${BASEURL}/update`,
    register: `${BASEURL}/register`,
    logout: `${BASEURL}/logout`,

    //GET
    user: `${BASEURL}/user`,
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
    challenges: `${BASEURL}/challenges`,
    challenge: (id) => `${BASEURL}/challenge/${id}`,
    trail: (id) => `${BASEURL}/trail/${id}`,
    trail_premium: (id) => `${BASEURL}/trail_premium/${id}`,
    project: (id) => `${BASEURL}/project/${id}`,
    feedback: (id) => `${BASEURL}/feedback/${id}`,
    badges: `${BASEURL}/dashboard/badges`,
  },

  PROJECT: {
    // GET
    project_edit: (id) => `${BASEURL}/project/edit/${id}`,
  },

  TERMS: {
    terms: `${BASEURL}/terms-of-use`,
  },
};

export { COMPANY };
