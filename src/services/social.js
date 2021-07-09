import axios from "axios";

// const cors = (url) => `http://cors-anywhere.herokuapp.com/${url}`;
const cors = (url) => url;

export const linkedin = async (data, uri) => {
  const obj = {};
  let token = "";
  await linkedinToken(data, uri)
    .then((res) => (token = res.data.access_token))
    .catch((err) => console.log(err));
  await linkedinMe(token)
    .then((res) => {
      obj.name = res.data?.firstName?.localized?.pt_BR;
      obj.last_name = res.data?.lastName?.localized?.pt_BR;
      obj.password = res.data?.id;
    })
    .catch((err) => console.log(err));
  await linkedinEmail(token)
    .then((res) => (obj.email = res.data?.elements[0]["handle~"]?.emailAddress))
    .catch((err) => console.log(err));
  return obj;
};

export const linkedinToken = async (data, uri) => {
  const url = "https://www.linkedin.com/oauth/v2/accessToken";
  const client_id = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
  const client_secret = process.env.REACT_APP_LINKEDIN_SECRET_ID;

  const req = axios({
    url: cors(url),
    headers: {
      // Host: "http//:localhost:3000/auth/talento/login",
      // "Access-Control-Allow-Origin": "*",
      crossdomain: true,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "authorization_code",
      code: data.code,
      client_secret,
      client_id,
      redirect_uri: uri,
    },
  });
  return req;
};

const linkedinMe = async (token) => {
  const me = axios({
    url: cors("https://api.linkedin.com/v2/me"),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return me;
};

const linkedinEmail = async (token) => {
  const clientAwareMemberHandles = axios({
    url: cors(
      "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))"
    ),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return clientAwareMemberHandles;
};
