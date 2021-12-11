import { urlsApi } from './urls';

export interface Message {
  id: number;
  name: string;
  released: string;
  length: number;
}

export interface Token{
  id_token: string  
}

var messages : Message[] | undefined

export const getMessages = async( token : string ) => {
  messages = await http<Message[]>( "/tracks", token );
  return messages;
};

export const getMessage = (id: number) => {
  return messages?.find(m => m.id === id);
};

export const logIn = async() =>{
  try {
    const url = urlsApi.base + '/authenticate'
    var userData = {username: "admin", password : "admin", rememberMe: true};
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
    })
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const token: Token = await response.json();
    return token.id_token;
  } catch (error) {
    console.log("No se pudo obtener un token")
  }
}

export async function http<T>( request: RequestInfo, token: string ): Promise<T|undefined> {
  try {
    const bearer = 'Bearer '+ token;
    const response = await fetch(urlsApi.base + request, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'Authorization': bearer
        },
      }    
    );
    if (!response.ok) {
      throw Error(response.statusText)
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.log("No se pudo hacer la request")
  }
  return undefined;
}
