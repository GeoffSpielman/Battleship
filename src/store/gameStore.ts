import firebase from './firebase'
import { Module } from 'vuex'
import { RootState } from './RootState'
import { GameStatus } from '@/models/enums'

interface GameState {
    gameStatus: GameStatus;
}

const gameStore: Module<GameState, RootState> = {
    namespaced: true,
    state: {
        gameStatus: GameStatus.WaitingOnPlayers
    },

    getters: {
        getGameStatus(state): GameStatus {
            return state.gameStatus
        },
    },

    mutations: {
        setGameStatus(state, newGameStatus: GameStatus) {
            state.gameStatus = newGameStatus;
        },
    },

    actions: {

        //firebase listeners
        getFirebaseDatabase(context) {
            firebase.database.ref('game/status').on('value', function (snapshot) {
                context.commit('setGameStatus', snapshot.val());
            })
        },

        setGameStatus(_, recStatus: GameStatus) {
            firebase.database.ref('game/status').set(recStatus);
        },


        setCurrentPlayersList(_, recPlayersList: string[]){
            firebase.database.ref('game/currentPlayers').set(recPlayersList);
        }
    },
}

export default gameStore;