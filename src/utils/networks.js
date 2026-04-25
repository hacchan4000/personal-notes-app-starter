// ini untuk latihan fetch 

const END_POINT_URL ='https://notes-api.dicoding.dev/v1'

async function getAccessToken() {
  return localStorage.getItem('AccessToken')
}
async function putAccessToken(AccessToken) {
  return localStorage.setItem('AccessToken', AccessToken)
}

const Request = async (todo, {method='POST', body, token=false}) => {
  const accessToken = token ? await getAccessToken() : null
  const response = await fetch(`${END_POINT_URL}/${todo}`,{
    method,
    headers:{
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    return { error: true, message: responseJson.message }
  }

  return {error: false, data: responseJson.data}

}

export {
  getAccessToken,putAccessToken,Request
}
