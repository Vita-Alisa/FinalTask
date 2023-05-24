export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return { Authorization: '' };
  }
};

export function authHeaderWithFile() {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr)
    user = JSON.parse(userStr);

  if (user && user.accessToken) {
    return { "Content-Type": "multipart/form-data", Authorization: 'Bearer ' + user.accessToken };
  } else {
    return { "Content-Type": "multipart/form-data", Authorization: '' };
  }
};