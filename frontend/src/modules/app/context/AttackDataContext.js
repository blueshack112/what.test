//@flow
import React, { Component, createContext, useContext } from 'react';
import * as contextActionCreatore from '../actionCreators';
import type { MITRETacticType, TestClassType, TestType } from '../../dashboard/typedefs';
import { apiCaller } from 'lib/comms_v2/apiCaller';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const AttackDataContext = createContext();

type ProviderProps = {
  children: *,
};

export class AttackDataProvider extends Component<ProviderProps> {
  componentDidMount() {
    (!this.state.testClasses.length || !this.state.mitreTactics.length) &&
      this.state.updateAttackData();
  }

  state = {
    testClasses: [],
    mitreTactics: [],
    getAttackDataAction: contextActionCreatore.compileGetActionDataListAction(),
    updateAttackData: () => {
      apiCaller(this.state.getAttackDataAction.payload.path, this.state.getAttackDataAction).then(
        (response) => {
          this.state.updatePartialState(response);
        }
      );
    },
    updateState: (state) => {
      this.setState(state);
    },
    updatePartialState: (partialState) => {
      this.setState({ ...this.state, ...partialState });
    },
    getTestClassByID: (testClassID) => {
      return this.state.testClasses.find(
        (testClass: TestClassType) => testClassID === testClass.id
      );
    },
    getMitreTacticByID: (mitreTacticID) => {
      return this.state.mitreTactics.find(
        (mitreTactic: MITRETacticType) => mitreTacticID === mitreTactic.id
      );
    },
  };

  render() {
    return (
      <AttackDataContext.Provider value={this.state}>
        {this.props.children}
      </AttackDataContext.Provider>
    );
  }
}

export type AppContextType = {
  testClasses: TestType[],
  mitreTactics: MITRETacticType[],
  getTestClassByID: (number) => TestClassType,
  getMitreTacticByID: (number) => MITRETacticType,
  updateAttackData: () => void,
  updateState: (Object) => void,
  updatePartialState: (Object) => void,
};

export const useAttackDataContext = (): AppContextType => {
  return useContext(AttackDataContext);
};
