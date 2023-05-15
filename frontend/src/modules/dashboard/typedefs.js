//@flow
import type { UserType } from 'modules/auth/typedefs';

export type TestClassType = {
  id: number,
  name: string,
};
export type MITRETacticType = {
  id: number,
  mitreId: string,
  externalId: string,
  name: string,
  description: string,
  createdAt: string,
  modifiedAt: string,
};
export type TestType = {
  id: number,
  name: string,
  testClass: number,
  testClassDetail: TestClassType,
  createdBy: number,
  description: string,
  mitreTactics: number[],
  mitreTacticsDetail: MITRETacticType[],
  isExecutableFileAvailable: boolean,
  code: string,
  extension: string,
  createdAt: string,
  updatedAt: string,
};

export type TestsSWREntity = {
  data: TestType[],
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};

export type TestSWREntity = {
  data: TestType,
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
export type PackageType = {
  id: number,
  name: string,
  tests: number[],
  testClassDetail: TestClassType,
  createdBy: number,
  createdByDetail: UserType,
  description: string,
  mitreTactics: number[],
  mitreTacticsDetail: MITRETacticType[],
  isExecutableFileAvailable: boolean,
  extension: string,
  createdAt: string,
  updatedAt: string,
};

export type PackageSWREntity = {
  data: PackageType[],
  isError: boolean,
  isLoading: boolean,
  isSWR: boolean,
  mutate: () => void,
};
