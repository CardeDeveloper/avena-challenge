import React, {Component} from 'react';
import Card from './card';
import Loader from './loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect} from "react-router-dom";
import config from  '../../config';
import {uid} from 'react-uid';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            auth :  localStorage.getItem('auth'),
            query: [],
            renderItems:[],
            date: '2018-11-07T17:57:00.913Z',
            endDate: new Date().toISOString(),
            nextPage : '',
            filter: '',
            isLoading:true
        };
        
      }

      componentDidMount(){
        this._search();
         
      }
      _logout=()=>{
        localStorage.removeItem('auth');
        this.setState({auth: ''});
      }
      _handleDate=(e)=>{
            this.setState({
                date: new Date(e.target.value).toISOString()
            });
            
      }
      _handleEndDate = (e) =>{
            this.setState({
                endDate: new Date(e.target.value).toISOString()
            });
      }
      
      _search = async ()=>{
            const {date,endDate} = this.state;
            let response = await this._handleRequest(date, endDate);
            this.setState({
                query: response.items ? response.items: [],
                renderItems: response.items ? response.items: [],
                nextPage: response.nextPageToken 
            });
            this.setState({isLoading: false});
      }
      _loadMore= async ()=>{
        const {date,endDate, nextPage} = this.state;
        let response = await this._handleRequest(date, endDate, nextPage!= '' ? nextPage : '');
            this.setState({
                query: response.items ? [...this.state.query,...response.items]: this.state.query,
                renderItems: response.items ? [...this.state.renderItems,...response.items]: this.state.query,
                nextPage: response.nextPageToken 
            });
        this.setState({isLoading: false});
      }
      _applyFilter = (e)=>{
        const val= e.target.value;
        let {query} = this.state;
        this.setState({
            renderItems: query.filter(el => el.patient.includes(val.toLowerCase()))
        });
        
      }
      _handleRequest= (date,endDate, nextPage='') =>{
        this.setState({isLoading: true});
        const {auth}= this.state;
        return fetch(config.url + `?limit=${config.limit}&date=${date}&date_end=${endDate}&nextPageToken=${nextPage}`, {
            headers: {
                'Authorization' : 'Basic ' + auth
            }
        })
        .catch(err => console.log)
        .then(res => res.json())
        .then(response => response)
      }


    
    
      
    render(){
        let { auth, renderItems } = this.state;
       
        if (!auth) return <Redirect to="/login" />;
        return(
            <section className="container">
                <div className="column is-mobile">
                    <button onClick={this._logout} className="button is-danger">salir</button>
                </div>
                <div className="columns is-multiline is-mobile">
                    <div className="column">
                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <label htmlFor="date">Desde: </label>
                                <input onChange={this._handleDate} id="date" name="date" className="input" type="date"/>
                            </p>
                            <p className="control">
                                <label htmlFor="endDate">Hasta: </label>
                                <input onChange={this._handleEndDate} id="endDate" name="endDate" className="input" type="date"/>
                            </p>
                            <p className="control">
                                <button onClick={this._search}  className="button is-primary">Buscar</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="columns is-centered is-multiline is-mobile">
                    <div className="column is-4-tablet">
                        <div className="field">
                            <div className="control has-icons-left">
                                <input onChange={this._applyFilter}  type="text" className="input" placeholder="patient"/>
                                <span className="icon is-small is-left"><FontAwesomeIcon icon="user" /></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline is-mobile">
                    {
                       
                       renderItems.map((item,index) =>{
                            return(
                                
                              <div key={uid(item.patient + index)} className="column is-12-mobile is-6-tablet is-4-desktop is-3-fullhd">
                                  <Card patient={item.patient} age={item.age} result={item.result} test={item.test} date={item.date} />
                              </div>
                            )
                        })
                    }
                        
                    
                    
                  
                </div>
                <div className={""+ (this.state.isLoading ? "show" : "hidden")}><Loader /></div>
                <div className={""+ (!this.state.isLoading  ? this.state.nextPage!='' ? 'show': 'hidden'  : "hidden" )}>
                    <button onClick={this._loadMore} className={"button is-warning is-centered "}>Cargar MAS..</button>
                </div>
               
                
                
            </section>
        )
    }
}

export default Home;
