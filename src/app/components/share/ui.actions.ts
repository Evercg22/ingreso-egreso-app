import { Action } from '@ngrx/store';


export const ACTIVAR_LOADING = '[UI Loading] Cargando...';
export const DESACTIVAR_LOADING = '[UI Loading] Fin de Carga...';

export class ActivarLodingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DesactivarLodingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type actions = ActivarLodingAction   |
                        DesactivarLodingAction;
