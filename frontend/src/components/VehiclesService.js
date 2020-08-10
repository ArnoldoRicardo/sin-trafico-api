/** @format */

import axios from 'axios';
const API_URL = 'http://localhost:8000/api';

const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
const user = document.getElementById('user').value;

export default class VehiclesService {
    getVehicles() {
        const url = `${API_URL}/vehicles/`;
        return axios.get(url).then((response) => response.data);
    }
    getVehiclesByURL(link) {
        const url = `${API_URL}${link}`;
        return axios.get(url).then((response) => response.data);
    }
    getVehicle(pk) {
        const url = `${API_URL}/vehicles/${pk}`;
        return axios.get(url).then((response) => response.data);
    }
    deleteVehicle(vehicle) {
        const url = `${API_URL}/vehicles/${vehicle.pk}/`;
        return axios.delete(url, { headers: { 'X-CSRFToken': csrf } });
    }
    createVehicle(vehicle) {
        const url = `${API_URL}/vehicles/`;

        vehicle.owner = `${API_URL}/users/${user}/`;

        return axios.post(url, vehicle, { headers: { 'X-CSRFToken': csrf } });
    }
    updateVehicle(vehicle) {
        const url = `${API_URL}/vehicles/${vehicle.pk}/`;

        vehicle.owner = `${API_URL}/users/${user}/`;

        return axios.put(url, vehicle, { headers: { 'X-CSRFToken': csrf } });
    }
}
