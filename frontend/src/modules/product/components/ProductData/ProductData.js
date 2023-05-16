//@flow
import React from 'react';
import { Box } from '@mui/material';
import type { ProductType } from '../../typedefs';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';

type Props = {
  innerRef: any,
  products: ProductType[],
  dataGridHeight: number,
  loadingProducts: boolean,
  selectedIds: number[],
  updateSelectedIds: (number[]) => void,
};

const ProductData = (props: Props) => {
  const { innerRef, products, dataGridHeight, loadingProducts, selectedIds, updateSelectedIds } =
    props;
  const apiRef = useGridApiRef();
  const onSelectionUpdated = (ids) => {
    updateSelectedIds(ids);
  };

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
        loading={loadingProducts}
        apiRef={apiRef}
        rows={products}
        columns={tableColumns}
        onRowSelectionModelChange={onSelectionUpdated}
        checkboxSelection
        rowSelectionModel={selectedIds}
        sx={{ height: dataGridHeight }}
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
