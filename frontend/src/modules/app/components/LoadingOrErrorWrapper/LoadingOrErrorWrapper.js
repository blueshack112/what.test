//@flow
import React from 'react';
import type { SWREntity } from 'lib/comms_v2/typeDefs';
import { CircularProgress } from '@mui/material';

type Props = {
  children: React$Node,
  swrEntity: SWREntity,
  errorFallback?: React$Node,
  errorFallbackArgs?: Array,
  showLoading?: boolean,
};

const LoadingOrErrorWrapper = (props: Props) => {
  const { children, swrEntity, errorFallback, errorFallbackArgs, showLoading = true } = props;

  if (showLoading && swrEntity.isLoading) {
    return <CircularProgress />;
  }

  if (swrEntity.isError) {
    if (errorFallback) {
      return errorFallbackArgs ? errorFallback(...errorFallbackArgs) : errorFallback();
    }
    // TODO: Default "restart app" logic
    return null;
  }
  return children || null;
};

export default LoadingOrErrorWrapper;
