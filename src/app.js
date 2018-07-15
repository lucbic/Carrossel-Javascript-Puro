import Styles from './styles/global.scss'
import Swiper from 'swiper'
import request from './js/request'

// globals
var mySwiper = new Swiper ('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 3,
  slidesPerGroup: 3,
  breakpoints: {
    [Styles.breakpointLg.slice(0, -2)]: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    [Styles.breakpointMd.slice(0, -2)]: {
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  }
})
var svg
var data

// onload
window.onload = () => {
  request('/static/json/products.json').then(response => {
    data = JSON.parse(response)[0].data
    getSvg()
  }).catch(error => {
    console.log(error)
  })
}

// functions
function getSvg () {
  request('/static/images/baseline-add_shopping_cart-24px.svg').then(response => {
    svg = response
    populate()
  }).catch(error => {
    console.log(error)
    return false
  })
}

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

function populate () {
  createSlides(data.recommendation)

  const itemImg = document.querySelector('.item__img')
  const itemDescription = document.querySelector('.item__description')
  const itemPrice = document.querySelector('.item__price-tag')
  const itemConditions = document.querySelector('.item__conditions-tag')

  itemImg.src = imgPath(data.item.imageName)
  itemDescription.textContent = showLess(90, data.item.name)
  itemPrice.textContent = data.item.price
  itemConditions.textContent =
    formatConditions(data.item.productInfo.paymentConditions)
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

    let button = document.createElement('a')
    button.className = 'rec__add-btn'

    let lateralBar = document.createElement('div')
    lateralBar.className = 'add-btn__lateral-bar'

    let buttonImg = document.createElement('div')
    buttonImg.className = 'add-btn__img'
    buttonImg.innerHTML = svg

    button.appendChild(document.createTextNode('adicionar ao carrinho'))
    button.appendChild(lateralBar)
    button.appendChild(buttonImg)


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
    newSlide.appendChild(button)

    // append new slide to swiper
    swiperWrapper.appendChild(newSlide)
  })

  mySwiper.update()
}
