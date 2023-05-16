//@flow
import React from 'react';
import { Box } from '@mui/material';
import type { ProductType } from '../../typedefs';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
  innerRef: any,
  products: ProductType[],
  dataGridHeight: number,
};

const ProductData = (props: Props) => {
  const { innerRef, products, dataGridHeight } = props;

  const tableColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product name',
      minWidth: 200,
      flex: 1,
    },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 500,
      flex: 1,
    },
  ];

  return (
    <Box ref={innerRef} sx={{ marginTop: 2 }}>
      <DataGrid
        sx={{ height: dataGridHeight }}
        rows={products}
        columns={tableColumns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
      />
    </Box>
  );
};

export default ProductData;
