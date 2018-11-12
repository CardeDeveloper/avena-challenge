import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';
import config from  '../../config';
import { Redirect} from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state = { 
            redirectToReferrer: false,
            isLoading: false,
            logError: false
        };
    }
    
    _handleSubmit= (e) =>{
        e.preventDefault();
        this.setState({isLoading: true});
        const {user,password} = this.state;
        const auth= btoa(unescape(encodeURIComponent(`${user}:${password}`)));
        fetch(config.url + `?limit=${config.limit}`, {
            headers: {
                'Authorization' : 'Basic ' + auth
            }
        }).then(res => res.json())
        .then(response => {
            if(response.nextPageToken){
                localStorage.setItem('auth', auth);
                this.setState({redirectToReferrer: true});
            }else{
                localStorage.setItem('auth', '');
                this.setState({logError: true});
            }
            this.setState({isLoading: false});
            
        })
    }
    render(){
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to="/" />;
        return(
           <section id="loginForm" className="hero is-success is-fullheight">
                <div className="hero-body">
            <div className="container has-text-centered">
            <div className={"notification is-danger "+  (this.state.logError ? 'show' : 'hidden')}>
                <button onClick={()=> this.setState({logError:false})} className="delete"></button>
                Error al iniciar sesion, <strong>Usuario o Contraseña incorrectos</strong>, porfavor verifica tu informacion.
            </div>
                <div className="column is-4 is-offset-4">
                    <h3 className="title has-text-grey">Avena</h3>
                    <p className="subtitle has-text-grey">Por favor inicia sesion.</p>
                    <div className="box">
                        <figure className="avatar">
                            <img src="http://avena.io/img/avena_stripe.png" />
                        </figure>
                        <form onSubmit={this._handleSubmit}>
                            <div className="field">
                                <div className="control">
                                    <input onChange={(e) => {this.setState({user:e.target.value})}} className="input is-large" type="text" placeholder="Usuario" />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <input onChange={(e) => {this.setState({password:e.target.value})}}  className="input is-large" type="password" placeholder="Contraseña" />
                                </div>
                            </div>
                            {/* por si alcanzo a implementar */}
                            {/* <div className="field">
                                <label className="checkbox">
                  <input type="checkbox" />
                  Recuerdame
                </label>
                            </div> */}
                            <button className={"button is-block is-info is-large is-fullwidth  " + (this.state.isLoading ? 'is-loading' : '')} >Entrar</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
           </section>
        );
        
    }
}

export default Login;
