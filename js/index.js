let error_msg = document.getElementById("error_msg");
let container = document.getElementById("inside_container");

container.style.display = "none";
error_msg.style.display = "none";

function add_data(our_data){
    
    let inside_container = document.getElementById("inside_container");
    console.log(inside_container);
    console.log(our_data);

    let temperature = (our_data.main.temp - 273.15).toFixed(2);

    let html = "";

    html = `
    <div><i class = "fa fa-address-book-o"></i> City: ${our_data.name}</div>
    <div><i class = "fa fa fa-building-o"></i> Country Code: "${our_data.sys.country}"</div>
    <div><i class = "fa fa-snowflake-o"></i> Humidity: ${our_data.main.humidity} %</div>
    <div><i class = "fa fa-thermometer-2"></i> Temperature: ${temperature} °C ( ${((temperature * 9/5) + 32).toFixed(2)} °F )</div>
    <div><i class = "fa fa-sliders"></i> Pressure: ${our_data.main.pressure} hPa</div>
    <div><i class = "fa fa-newspaper-o"></i> Weather Description: ${our_data.weather[0].description}</div>
    <div><i class = "fa fa-spinner"></i> Wind Speed: ${our_data.wind.speed} m/s</div>
    <div><i class = "fa fa-arrows"></i> Wind Direction: ${our_data.wind.deg} °(meteorologically)</div>
    `

inside_container.innerHTML = html;

error_msg.style.display = "none";
container.style.display = "flex";



}

const weather = async () => {
  
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=a1f792a5162750c5bcbe65e04d9e5742`
    );

    if(data.status !== 200){
       error_msg.style.display = "flex";
       container.style.display = "none";
    }

    else{
      const our_data = await data.json();
      add_data(our_data);
    }

};


const submit_btn = document.getElementById("submit-btn");

submit_btn.addEventListener("click", function(){

  container.style.display = "none";
  error_msg.style.display = "none";

    city_name = document.getElementById("city_name_input").value;

    weather();

});