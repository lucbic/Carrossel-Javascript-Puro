require('./styles/global.scss')

const teste = 'iPhone SE Apple com 16GB, Tela 4”, iOS 9, Sensor de Impressão Digital, Câmera iSight 12MP, Wi-Fi, 3G/4G, GPS, MP3, Bluetooth e NFC - Cinza Espacial'

function showLess(n, text) {
  if (text.lenght <= n) { return text }
  const sub = text.substr(0, n-1)
  return sub.substr(0, sub.lastIndexOf(' ')) + '...'
}

window.onload = () => {
  const product = document.querySelector('.product__description')
  product.textContent = showLess(90, teste)
}
