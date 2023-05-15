//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { fetchCollection } from '../../lib/comms_v2/actionCreators';

export const compileGetActionDataListAction = (): CrudAction =>
  fetchCollection('AttackData', 'attackdata/');
