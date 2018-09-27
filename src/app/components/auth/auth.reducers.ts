import * as  fromAuth from './auth.actions';
import { User } from '../../models/user.model';

export interface AutState {
    user: User;
}

const initState: AutState = {
    user: null
};

export function authReducer ( state = initState, action: fromAuth.actions): AutState {
    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            };
    
        default:
            return state;
    }
}
