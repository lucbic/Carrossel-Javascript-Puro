export default (path) => {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest()

    xhttp.open('GET', path)

    xhttp.onload = () => {
      if (xhttp.status >= 200 && xhttp.status < 300) {
        resolve(JSON.parse(xhttp.response))
      } else {
        reject(xhttp.statusText)
      }
    }
    xhttp.onerror = () => reject(xhttp.statusText)

    xhttp.send()
  })
}
