/** @format */

import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import VehicleCreateUpdate from './VehicleCreateUpdate';

import VehiclesService from './VehiclesService';
const vehiclesService = new VehiclesService();

export default class Mapa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: [],
            map: {
                lat: 50,
                lon: 50,
            },
            vehicleIndex: null,
            form: {
                Placas: '',
                lat: '',
                lon: '',
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var self = this;
        vehiclesService.getVehicles().then(function (result) {
            if (result.length > 1) {
                self.setState({
                    vehicles: result,
                    map: { lat: result[0].lat, lon: result[0].lon },
                });
            } else {
                self.setState({ vehicles: result });
            }
        });
    }

    handleDelete(e, pk) {
        var self = this;
        vehiclesService.deleteVehicle({ pk: pk }).then(() => {
            var newArr = self.state.vehicles.filter(function (obj) {
                return obj.pk !== pk;
            });

            self.setState({ vehicles: newArr });
        });
    }

    handleCreate() {
        var self = this;

        vehiclesService
            .createVehicle({
                Placas: this.state.form.Placas,
                lat: this.state.form.lat,
                lon: this.state.form.lon,
            })
            .then((result) => {
                self.setState((state) => {
                    const vehicles = state.vehicles.concat(result.data);

                    return {
                        vehicles,
                        form: {
                            Placas: '',
                            lat: '',
                            lon: '',
                        },
                    };
                });
            })
            .catch((e) => {
                console.log(e);
                alert('Hay un error! Checa otra vez el formulario.');
            });
    }

    handleUpdate(index) {
        var self = this;

        vehiclesService
            .updateVehicle({
                pk: self.state.vehicles[index].pk,
                Placas: self.state.form.Placas,
                lat: self.state.form.lat,
                lon: self.state.form.lon,
            })
            .then((result) => {
                console.log(result.data);
                self.setState((state) => {
                    const vehicles = state.vehicles.map((item, i) => {
                        if (i === index) {
                            return result.data;
                        } else {
                            return item;
                        }
                    });

                    return {
                        vehicles,
                        form: {
                            Placas: '',
                            lat: '',
                            lon: '',
                        },
                        vehicleIndex: null,
                    };
                });
            })
            .catch((e) => {
                console.log(e);
                alert('Hay un error! Checa otra vez el formulario.');
            });
    }

    handleChange(e) {
        const value = e.target.value;
        const form = this.state.form;
        this.setState({
            form: {
                ...form,
                [e.target.name]: value,
            },
        });
    }

    handleSubmit(e) {
        if (this.state.vehicleIndex) {
            const index = this.state.vehicleIndex;
            this.handleUpdate(index);
        } else {
            this.handleCreate();
        }
        e.preventDefault();
    }

    handleClickUpdate(e, index) {
        const vehicle = this.state.vehicles[index];
        this.setState({
            form: {
                Placas: vehicle.Placas,
                lat: vehicle.lat,
                lon: vehicle.lon,
            },
            vehicleIndex: index,
        });
    }

    render() {
        const zoom = 15;
        const styleMap = { width: '100%', height: '90vh' };

        const position = [this.state.map.lat, this.state.map.lon];

        return (
            <div className='container is-fluid mt-2'>
                <div className='columns'>
                    <div className='column is-one-third'>
                        <VehicleCreateUpdate
                            submit={this.handleSubmit}
                            form={this.state.form}
                            change={this.handleChange}
                            isEdit={this.state.vehicleIndex}
                        />
                    </div>
                    <div className='column'>
                        <Map style={styleMap} center={position} zoom={zoom}>
                            <TileLayer
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />

                            {this.state.vehicles.map((vehicle, index) => (
                                <Marker
                                    position={[vehicle.lat, vehicle.lon]}
                                    key={vehicle.pk}
                                >
                                    <Popup>
                                        {vehicle.Placas}{' '}
                                        <button
                                            className='button is-danger'
                                            onClick={(e) =>
                                                this.handleDelete(e, vehicle.pk)
                                            }
                                        >
                                            Borrar
                                        </button>
                                        <button
                                            className='button is-primary'
                                            onClick={(e) =>
                                                this.handleClickUpdate(e, index)
                                            }
                                        >
                                            editar
                                        </button>
                                    </Popup>
                                </Marker>
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}
