import { AuthContextProps } from "../Auth"

export interface LoginType {
    auth: AuthContextProps,
    API: string
    email: string,
    password: string
}

export const COMPLETED_STATUS = "COMPLETED"
export const LOADING_STATUS = "LOADING"
export const ERROR_STATUS = "ERROR"

const usePostLogin = async (loginData: LoginType) => {
  // console.log('LoginData: ', loginData)
  const startTimestamp = performance.now();
  const res = await fetch(loginData.API, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${loginData.email}&password=${loginData.password}`,
  });
  const endTimestamp = performance.now();
  console.log(`Time taken: ${endTimestamp - startTimestamp} ms`);
  const data = await res.json();
  // console.log('TokenData: ', data)
  const tokenActual = data.token["access token"];
  // console.log('TokenActual: ', tokenActual)
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

