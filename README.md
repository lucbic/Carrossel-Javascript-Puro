- O projeto foi executado utilizando Javascript ES6 puro, transpilado com Webpack + Babel.
- A única biblioteca externa utilizada foi a [Swiper](http://idangero.us/swiper/get-started/) para a construção do carrossel.
- O arquivo products.json é lido via chamada ajax de forma assíncrona, utilizando Promise.
- A estilização foi feita utilizando Sass, de forma modular - com arquivos separados para variáveis, fontes, queries e css-reset.
- Utilizei css transitions nos eventos de hover para obter um design fluido. 
- O widget desenvolvido possui responsividade mobile; foram utilizados 3 breakpoints para adaptação a qualquer tipo de dispositivo.

## Como executar

- Clone o repositório em sua máquina
- Instale as dependências necessárias (necessário ter npm instalado)
- Execute o dev-server

```
git clone https://github.com/lucbic/itelios-frontend-challenge.git
cd itelios-frontend-challenge
npm install
npm run dev
```
A aplicação estará disponível em `http://localhost:8080/`

