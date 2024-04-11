async function fetchCities() {
    const temperature = document.getElementById('temperature').value;
    const response = await fetch(`/cities?temperature=${temperature}`);
    const data = await response.json();

    const citiesDiv = document.getElementById('cities');
    citiesDiv.innerHTML = '';

    data.forEach(city => {
        const p = document.createElement('p');
        p.textContent = city;
        p.addEventListener('click', () => crimeFinder(city)); 
        citiesDiv.appendChild(p);
    });
}

function changeCardSize() {
    document.querySelector('.container').style.height = '600px';
}


function crimeFinder(city) {
    let cityname = city.replace(/ /g, "-");
    const crimeURL = `https://www.numbeo.com/crime/in/${cityname}`;
    window.open(crimeURL, '_blank'); 
}

