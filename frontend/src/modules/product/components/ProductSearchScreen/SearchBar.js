//@flow
import React from 'react';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import * as actionCreators from '../../actionCreators';
import type { KeywordListSWREntity } from '../../typedefs';

type Props = {
  searchPhrase: string,
  updateSearchPhrase: (string) => void,
};

const SearchBar = (props: Props) => {
  const { searchPhrase, updateSearchPhrase } = props;

  const keywordsEntity: KeywordListSWREntity = useGlobalSWR(
    actionCreators.compileGetKeywordListAction()
  );
  const keywordsList = keywordsEntity?.data?.keywords;
  const filterOptions = (options, state) => {
    return createFilterOptions()(options, state).slice(0, 3);
  };

  const onSearchPhraseChanged = (event, value: string) => {
    updateSearchPhrase(value);
  };

  return (
    <Autocomplete
      freeSolo
      disableClearable
      onInputChange={onSearchPhraseChanged}
      inputValue={searchPhrase}
      filterOptions={filterOptions}
      options={keywordsList || []}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
};

export default SearchBar;
