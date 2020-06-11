import Vue from "vue";
import Vuex from "vuex";
import Adset from "@/model/Adset";
import Insight from "@/model/Insight";
import utils from "@/util/util";

Vue.use(Vuex);

interface State {
  metric1: string | undefined;
  metric2: string | undefined;
  date: string[] | undefined;
  adsets: Adset[] | undefined;

  // adsets: Adset[] | undefined
}

export default new Vuex.Store<State>({
  state: {
    metric1: undefined,
    metric2: undefined,
    date: undefined,
    adsets: undefined
    // adsets:
  },
  mutations: {
    setMetric1(state, payload) {
      state.metric1 = payload;
    },
    setMetric2(state, payload) {
      state.metric2 = payload;
    },
    setDate(state, payload) {
      state.date = payload;
    },
    setAdsets(state, payload) {
      state.adsets = payload;
    }
  },
  actions: {},
  getters: {
    metric1(state) {
      return state.metric1;
    },
    metric2(state) {
      return state.metric2;
    },
    date(state) {
      return state.date;
    },
    adsetsForScatterPlot(state) {
      //metric1, metric2
      if (!state.date) {
        return state.adsets;
      }

      if (!state.adsets) {
        return [];
      }

      if (!state.metric1 || !state.metric2) {
        return state.adsets;
      }

      return utils.filterAdset(state.date, state.adsets, false, [
        state.metric1,
        state.metric2
      ]);
    },
    adsetsForLineGraph(state) {
      //metric1
      if (!state.date) {
        return state.adsets;
      }

      if (!state.adsets) {
        return [];
      }

      if (!state.metric1) {
        return state.adsets;
      }
      return utils.filterAdset(state.date, state.adsets, false, [
        state.metric1
      ]);
    },
    adsets(state) {
      if (!state.adsets) {
        return [];
      }

      if (!state.date) {
        return state.adsets;
      }

      return utils.filterAdset(state.date, state.adsets, true);
    }
  },
  modules: {}
});
