import React, { Component } from 'react'
import Landing from "./landing";
import CreateSessionPage from './createSession';
import JoinSession from './joinSession';
import Lobby from './Lobby';
import socket from './../apis/port';
import io from 'socket.io-client';



export default class Container extends Component {
    constructor(props) {
        super(props)

        this.state = {
            landing:true,
            lobby:false,

            pl_one_name:"",
            lobby_waiting:true,
            code:"",
            isPlayer_one:false,

            gameState: {            
                p1_name: "",
                p2_name: "",
                p1_score: 0,
                p2_score: 0,
                ties: 0,
                p1_turn: true,
                grid: [0,0,0,
                    0,0,0,
                    0,0,0]
        
            }

        }
    }

    componentDidMount=()=>{
        socket.on("session-created",(name,code)=>{this.setState({
            landing:false,
            lobby:true,
            pl_one_name: name,
            code:code,
            isPlayer_one:true 
        })})

        socket.on("valid-code",(gameState)=>{
            this.setState({
                lobby_waiting: false,
                landing:false,
                lobby:true,
                gameState: gameState
           })
        })
    }
    
    
    render=()=>{
        
        const gamestate = this.state.gameState;

        return (
            <div>
                {this.state.landing && <Landing/>}
         
                {this.state.lobby && <Lobby gamestate={gamestate} waiting={this.state.lobby_waiting} code={this.state.code} isPlayer_one={this.state.isPlayer_one} /> }
                
            </div>
        )
    }
}
