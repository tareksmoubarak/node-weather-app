const getWeather = (location) => {
    fetch('/weather?address='+location+'').then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
            } else{
                messageOne.innerHTML = '<b>Location:</b> ' + data.placeName;
                messageTwo.textContent = 'The weather is ' + data.description + ". It's " + data.temperature + '. But feels like ' + data.feelslike;
            }
        });
    });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    getWeather(location);
})