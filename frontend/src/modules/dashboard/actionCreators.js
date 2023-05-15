//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import {
  createRecord,
  deleteRecord,
  fetchCollection,
  fetchRecord,
  updateRecord,
} from 'lib/comms_v2/actionCreators';
import type { PackageType, TestType } from './typedefs';

export const compileGetTestListAction = (): CrudAction => fetchCollection('tests', 'test/');

export const compileGetTestAction = (testID: number): CrudAction =>
  fetchRecord('tests', testID, `test/${testID}`);

export const compileDownloadTestAction = (testID: number): CrudAction =>
  createRecord('tests', `test/${testID}/download/`);

export const compileDownloadTestBatchAction = (data): CrudAction =>
  createRecord('tests', `test/download/`, { tests: data });

export const compileUpdateTestAction = (testID: number, data: TestType): CrudAction =>
  updateRecord('tests', testID, `test/${testID}/`, data);

export const compileCreateTestAction = (data: TestType): CrudAction =>
  createRecord('tests', `test/`, data);

export const compileGetPackageListAction = (): CrudAction =>
  fetchCollection('packages', 'package/');

export const compileDownloadPackageAction = (packageID: number): CrudAction =>
  createRecord('packages', `package/${packageID}/download/`);

export const compileDownloadPackageBatchAction = (data): CrudAction =>
  createRecord('packages', 'package/download/', { packages: data });

export const compileUpdatePackageAction = (packageID: number, data: PackageType): CrudAction =>
  updateRecord('packages', packageID, `package/${packageID}/`, data);

export const compileCreatePackageAction = (data: PackageType): CrudAction =>
  createRecord('packages', `package/`, data);

export const compileDeletePackageAction = (packageID: number): CrudAction =>
  deleteRecord('packages', packageID, `package/${packageID}/`);
