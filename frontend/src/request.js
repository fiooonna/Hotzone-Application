import Cookies from 'universal-cookie'

const cookies = new Cookies();

export async function request(endpoint, params) {
  let response = null
  const url = window.location.origin + "/api/" + endpoint + "/"
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: cookies.get("token")
          ? "Token " + cookies.get("token")
          : "",
      },
      body: JSON.stringify({
        params,
      }),
    })
  } catch (e) {
    // network error
    console.error(e)
  }
  try {
    const data = await response.json()
    // console.log(data)
    return data
  } catch (error) {
    return "Error"
  }
  
  // if (data.hasOwnProperty("result")) {
  //   console.log("???")
  //   return data.result
  // } else {
  //   throw data.error
  // }
}
