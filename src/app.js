import Styles from './styles/global.scss'
import Swiper from 'swiper'
import request from './js/request'

// globals
var mySwiper = new Swiper ('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  slidesPerView: 3,
  slidesPerGroup: 3,
  breakpoints: {
    [Styles.breakpointLg]: {
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  }
})

// onload
window.onload = () => {
  request('/static/json/products.json').then(response => {
    const data = response[0].data
    populate(data)
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

function formatConditions (str) {
  return str.replace('ou até ','').replace(' sem juros','')
}

function populate (data) {
  createSlides(data.recommendation)

  const itemImg = document.querySelector('.item__img')
  const itemDescription = document.querySelector('.item__description')
  const itemPrice = document.querySelector('.item__price-tag')
  const itemConditions = document.querySelector('.item__conditions-tag')

  itemImg.src = imgPath(data.item.imageName)
  itemDescription.textContent = showLess(90, data.item.name)
  itemPrice.textContent = data.item.price
  itemConditions.textContent = formatConditions(data.item.productInfo.paymentConditions)
}

function createSlides (recommendation) {
  let swiperWrapper = document.querySelector('.swiper-wrapper')

  recommendation.forEach( (item, index) => {
    // create new slide
    let newSlide = document.createElement('div')
    newSlide.className = 'swiper-slide recommendation'

    // create new slides attributes
    let img = document.createElement('img')
    img.className = 'rec__img'

    let description = document.createElement('p')
    description.className = 'rec__description'

    let price = document.createElement('p')
    price.className = 'rec__price'

    let priceTag = document.createElement('span')
    priceTag.className = 'rec__price-tag'
    price.appendChild(document.createTextNode('Por: '))
    price.appendChild(priceTag)

    let conditions = document.createElement('p')
    conditions.className = 'rec__conditions'

    let conditionsTag = document.createElement('span')
    conditionsTag.className = 'rec__conditions-tag'
    conditions.appendChild(document.createTextNode('ou '))
    conditions.appendChild(conditionsTag)
    conditions.appendChild(document.createTextNode(' sem juros'))

    // add json data to attributes
    img.src = imgPath(recommendation[index].imageName)
    description.textContent = showLess(90, recommendation[index].name)
    priceTag.textContent = recommendation[index].price
    conditionsTag.textContent =
      formatConditions(recommendation[index].productInfo.paymentConditions)

    // append attributes to new slide
    newSlide.appendChild(img)
    newSlide.appendChild(description)
    newSlide.appendChild(price)
    newSlide.appendChild(conditions)

    // append new slide to swiper
    swiperWrapper.appendChild(newSlide)
  })

  mySwiper.update()
}
