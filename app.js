const express = require("express")
const https = require("https");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
  })

app.post("/", function(req, res){

  const query = req.body.cityName
  const apiKey = "ceef7332c675b70d5cd644b156e3eae1"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?units="+ unit + "&q=" + query + "&appid=" + apiKey

  https.get(url, function(response){
      console.log(response.statusCode)

      response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const icon = weatherData.weather[0].icon
        const imageUrl ="http://openweathermap.org/img/wn/"+ icon + "@2x.png"

        const weatherDescription = weatherData.weather[0].description
        console.log(temp, weatherDescription)

        res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius</h1><br>")
        res.write("<h2>The weather now is " + weatherDescription + "</h2>")
        res.write("<img src="+imageUrl+">")
        res.send()
      })
})
})

app.listen(3000, function(){
  console.log("server is running on port 3000")
})
