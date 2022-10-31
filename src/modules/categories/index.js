import { default as state } from './state';
import { default as mutations } from './mutations';
import * as actions from './actions';

export default {
  state,
  mutations,
  actions,
  namespaced: true
}