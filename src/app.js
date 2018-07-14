require('./styles/global.scss')
import request from './js/request'

const teste = 'iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Cinza Espacial'

// onload
window.onload = () => {
  request('/static/json/products.json').then(response => {
    const data = response[0].data
    populate(data)
    console.log(data)
  }).catch(error => {
    console.log(error)
  })
}

// functions
function showLess (n, text) {
  if (text.lenght <= n) { return text }
  const sub = text.substr(0, n-1)
  return sub.substr(0, sub.lastIndexOf(' ')) + '...'
}

function imgPath (path) {
  const url = '//www.itelios.com.br/arquivos/imagens/'
  return path.replace(url, '/static/images/')
}

function conditions (str) {
  return str.replace('ou até ','').replace(' sem juros','')
}

function populate (data) {
  const itemImg = document.querySelector('.item__img')
  const itemDescription = document.querySelector('.item__description')
  const itemPrice = document.querySelector('.item__price-tag')
  const itemConditions = document.querySelector('.item__conditions-tag')

  itemImg.src = imgPath(data.item.imageName)
  itemDescription.textContent = showLess(90, data.item.name)
  itemPrice.textContent = data.item.price
  itemConditions.textContent = conditions(data.item.productInfo.paymentConditions)
}
