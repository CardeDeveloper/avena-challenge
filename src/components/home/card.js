import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './card.css';

export default class Card extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalActive: false
        }
    }
    static propTypes = {
        patient: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        result: PropTypes.string.isRequired,
        test: PropTypes.string,
        date:PropTypes.string.isRequired
        
    
      };
    render(){
        
        const {patient, age, test,result, date} = this.props;
        var datetoHuman= date.substring(0, 10);;
        
        return(
            <div className="card">

            <div className={"modal " + (this.state.isModalActive? 'is-active': '')}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="is-4" dangerouslySetInnerHTML={{ __html: result }}/> 
                </div>
                <button onClick={() => this.setState({isModalActive: false})} className="modal-close is-large" aria-label="close"></button>
            </div>
                
                <div onClick={() => this.setState({isModalActive: true})}className="card-content">
                    <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                        <img src="http://avena.io/img/avena_stripe.png" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{patient} | {age} años</p>
                        <p className="subtitle is-6">{test}</p>
                    </div>
                    </div>

                    <div className="content">
                    
                    <time dateTime="{datetoHuman}">{datetoHuman}</time>
                    </div>
                </div>
            </div>
        )
    }
}

