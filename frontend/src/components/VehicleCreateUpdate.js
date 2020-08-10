/** @format */

import React, { Component } from 'react';

export default class VehicleCreateUpdate extends Component {
    render() {
        return (
            <form onSubmit={this.props.submit}>
                <h3 className='title'>
                    {this.props.isEdit
                        ? `Editar Vehiculo ${this.props.form.Placas}`
                        : 'Vehiculo'}
                </h3>
                <div className='field'>
                    <label className='label'>Placas</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='text'
                            placeholder='Ingresa las placas'
                            name='Placas'
                            onChange={this.props.change}
                            value={this.props.form.Placas}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Latitud</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='number'
                            step='any'
                            name='lat'
                            placeholder='Ingresa la latitud'
                            onChange={this.props.change}
                            value={this.props.form.lat}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Logitud</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='number'
                            step='any'
                            name='lon'
                            placeholder='Ingresa la longitud'
                            onChange={this.props.change}
                            value={this.props.form.lon}
                        />
                    </div>
                </div>
                <div className='field'>
                    <p className='control'>
                        <button
                            className='button is-success'
                            type='submit'
                            value='Submit'
                        >
                            Guardar
                        </button>
                    </p>
                </div>
            </form>
        );
    }
}
