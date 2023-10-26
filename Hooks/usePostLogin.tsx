import { AuthContextProps } from "../Auth"

export interface LoginType {
    auth: AuthContextProps,
    API: string
    email: string,
    password: string
}

const usePostLogin = async (loginData: LoginType) => {
  const res = await fetch(loginData.API, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${loginData.email}&password=${loginData.password}`,
  });
  const data = await res.json();
  const tokenActual = data.token["access token"];
  // console.log('Token: ', tokenActual)
  const userActual = data.user
  // console.log('UsePostLoginDataUser: ',userActual)
  // console.log('LoginData:', loginData)
  if (res.ok) {
    loginData.auth.login(tokenActual, userActual);
    // console.log('respuesta Ok')
    const res = loginData.auth.login(tokenActual, userActual)
    // console.log('Respuesta de la api: ', res)
  }
  const answer = data["detail"];
  return answer;
};

export { usePostLogin };

