//@flow
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useCrudAction } from 'lib/comms_v2/nonGetActions';
import * as actionCreators from '../../actionCreators';
import type { ProductType } from '../../typedefs';
import ProductData from '../ProductData';
import SearchBar from './SearchBar';

const ProductSearchScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const searchProducts = useCrudAction(actionCreators.compileSearchProductsAction);
  const [productsList, setProductsList] = useState([]);

  // Update product list when searchPhrase changes
  useEffect(() => {
    if (!searchPhrase) {
      setProductsList([]);
      return;
    }
    searchProducts(searchPhrase).then((data: ProductType[]) => {
      setProductsList(data);
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
          <SearchBar updateSearchPhrase={setSearchPhrase} />
          <ProductData
            innerRef={productDataRef}
            products={productsList}
            dataGridHeight={shouldBeHeight}
          />
        </Box>
      </Grid>
    </>
  );
};

export default ProductSearchScreen;
