import React, {Component} from 'react';
import './loader.css';

export default class Loader extends Component{
    render(){
        return(
        <header className="App-header">
                <div className="App-logo"></div>
                
                <p>
                <code>cargando..</code>
                </p>
                
        </header>
        )
    }
}