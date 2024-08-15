import './ChessApp.css';
import Board from './components/Board/Board';
import { reducer } from './reducer/reducer'
import { useReducer } from 'react'
import { initGameState } from './constants';
import AppContext from './contexts/Context'
import Control from './components/Control/Control';
import TakeBack from './components/Control/bits/TakeBack';
import MovesList from './components/Control/bits/MovesList';
import Navbar from '../Component/Navbar';

function ChessRouting() {

    const [appState, dispatch ] = useReducer(reducer,initGameState);

    const providerState = {
        appState,
        dispatch
    }
    return (
        
        <AppContext.Provider value={providerState} >
            <div className='Chess-board_1'>
                <div>
                    <Navbar/>
                </div>
            <div className="ChessApp">
                <Board/>
                <Control>
                    <MovesList/>
                    <TakeBack/>
                </Control>
            </div>
        </div>
        </AppContext.Provider>
    ); 
}

export default ChessRouting;
