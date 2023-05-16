//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { createRecord, fetchCollection } from 'lib/comms_v2/actionCreators';

export const compileGetKeywordListAction = (): CrudAction =>
  fetchCollection('CurrentUser', 'products/list-keywords/');

export const compileSearchProductsAction = (searchPhrase: string): CrudAction =>
  createRecord('CurrentUser', 'products/search/', { query: searchPhrase });
