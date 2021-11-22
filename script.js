document.querySelector('.busca').addEventListener('submit', async event => {
  event.preventDefault() // preventdefault previne o comportamento padrão
  let input = document.querySelector('#searchInput').value

  if (input !== '') {
    clearInfo()
    // se o input estiver diferente (!==)de vazio ('') significa que tem algo digitado
    showWarning('Carregando...')

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=c1c339b991f64dff38043e92735d519d&units=metric&lang=pt_br`

    let results = await fetch(url) // await significa , faz a requisiçao e espera o resultado , ele esperou e quando deu o resultado ele armazenou  em results
    let json = await results.json() // pega o resultado e transforma em json

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        desc: json.weather[0].description,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      })
    } else {
      clearInfo()
      showWarning('Não encontramos esta localização.')
    }
  } else {
    clearInfo()
  }
})

function showInfo(json) {
  showWarning('')

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`

  document.querySelector(
    '.ventoInfo'
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`

  document
    .querySelector('.temp img')
    .setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    )
  document.querySelector('.iconTitulo').innerHTML = `${json.desc} `

  document.querySelector('.ventoPonto').style.transform = `rotate(${
    json.windAngle - 90
  }deg)`

  document.querySelector('.resultado').style.display = 'block'
}

function clearInfo() {
  showWarning('')
  document.querySelector('.resultado').style.display = 'none'
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg
}
