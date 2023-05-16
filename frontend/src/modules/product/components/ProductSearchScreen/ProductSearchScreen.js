//@flow
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useCrudAction } from 'lib/comms_v2/nonGetActions';
import * as actionCreators from '../../actionCreators';
import * as authActionCreators from 'modules/auth/actionCreators';
import type { ProductType } from '../../typedefs';
import ProductData from '../ProductData';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import type { UserSWREntity } from '../../../auth/typedefs';
import { UserContext } from '../../../contexts/user';

const ProductSearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  const searchProducts = useCrudAction(actionCreators.compileSearchProductsAction);
  const updateSearchAndSelectionData = useCrudAction(
    authActionCreators.compilePatchActiveSelectionDataAction
  );
  const userEntity: UserSWREntity = useContext(UserContext);

  const [productsList, setProductsList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const updateSearchPhrase = (value) => {
    setSearchPhrase(value);
    setSelectedIds([]);
  };
  const updateSelectedIds = (ids) => {
    updateSearchAndSelectionData(userEntity.data.activeSearchAndSelection.id, {
      ...userEntity.data.activeSearchAndSelection,
      selectedProducts: ids,
    })
      .then(() => {
        productsList && setSelectedIds(ids);
      })
      .catch(() => {});
  };

  // Update search and product selection when user context is available
  useEffect(() => {
    if (userEntity.data?.activeSearchAndSelection) {
      setSearchPhrase(userEntity.data.activeSearchAndSelection.searchQuery);
      setSelectedIds(userEntity.data.activeSearchAndSelection.selectedProducts);
    }
  }, [userEntity.data]);

  // Update product list when searchPhrase changes
  useEffect(() => {
    if (!searchPhrase) {
      setProductsList([]);
      return;
    }
    setLoadingProducts(true);
    searchProducts(searchPhrase)
      .then((data: ProductType[]) => {
        setProductsList(data);
      })
      .catch(() => {
        toast.error('Could not load products');
      })
      .finally(() => {
        setLoadingProducts(false);
      });
  }, [searchPhrase, searchProducts]);

  // Constraint height. Account for different screen sizes
  const [currentListNode, setCurrentListNode] = useState(null);
  const [shouldBeHeight, setShouldBeHeight] = useState(null);
  const calculateHeight = useCallback(
    (node) => {
      if (!currentListNode && !node) return;
      const nodeToCalculate = node || currentListNode;
      const pageHeight = window.innerHeight;
      const thisElementYOffset = nodeToCalculate.getBoundingClientRect().y;
      return pageHeight - thisElementYOffset - 50;
    },
    [currentListNode]
  );

  const windowResized = () => {
    setShouldBeHeight(calculateHeight());
  };
  window.addEventListener('resize', windowResized);
  // Sent to datagrid container
  const productDataRef = (node) => {
    if (!node || node.isEqualNode(currentListNode)) {
      return;
    }
    node && setCurrentListNode(node);
    setShouldBeHeight(calculateHeight(node));
  };

  return (
    <>
      <Grid
        container
        sx={{
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          paddingX: 4,
          paddingTop: 4,
        }}
      >
        <Typography variant={'h4'} sx={{ alignSelf: 'start' }}>
          Search For Products
        </Typography>
        <Box
          sx={{
            width: '100%',
            marginTop: 4,
          }}
        >
          <SearchBar searchPhrase={searchPhrase} updateSearchPhrase={updateSearchPhrase} />
          <ProductData
            innerRef={productDataRef}
            products={productsList}
            loadingProducts={loadingProducts}
            dataGridHeight={shouldBeHeight}
            selectedIds={selectedIds}
            updateSelectedIds={updateSelectedIds}
          />
        </Box>
      </Grid>
    </>
  );
};

export default ProductSearchScreen;
