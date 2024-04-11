require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const apiKey = process.env.KEY;

app.use(express.static('public'));

app.get('/cities', async (req, res) => {
    try {
        const temperature = req.query.temperature;
        const cities = ['Puerto Vallarta', 'Cancun', 'Cabo San Lucas', 'Isla Mujeres', 'Mazatlan', 'Playa del Carmen', 
                        'Nassau', 'Havana', 'Honolulu', 'Santo Domingo', 'Cap-Haitien', 'Jacmel', 'Port-au-Prince', 'San Juan', 
                        'Ponce', 'Kahului', 'Kailua-Kona', 'Kihei', 'Ocho Rios', 'Montego Bay', 'Kingston', 'Road Town',
                        'Bridgetown', 'Belize City', 'El Zonte', 'Cartagena', 'Santa Marta', 'La Guaira', 'Puerto Cabello'];
        const citiesAboveTemperature = [];

        for (const city of cities) {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const forecast = response.data.list.find(entry => {
                const date = new Date(entry.dt * 1000);
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return date.getDate() === tomorrow.getDate() && date.getHours() === 14; 
            });
            if (forecast && forecast.main.temp_max >= temperature) {
                citiesAboveTemperature.push(city);
            }
        }

        res.json(citiesAboveTemperature);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

