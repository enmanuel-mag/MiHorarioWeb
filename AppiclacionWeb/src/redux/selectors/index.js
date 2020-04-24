import { get } from 'lodash';

export const isSearchingLoading = state => get(state, 'carreras.isLoading')
export const carrerasResults = state => get(state, 'carreras.carreras')

export const carreraSeleccionada = state => get(state, 'carrera.carrera')
export const materiasSeleccionadas = state => get(state, 'materias.materias')

export const teoricosResults = (state,codigo) =>{
    return get(state, 'teoricos.teoricos').find(par => par.codigo === codigo)
} 
export const asociadosResults = (state,teoricoId) =>{
    return get(state, 'asociados.asociados').find(par => par.teoricoId === teoricoId)
} 