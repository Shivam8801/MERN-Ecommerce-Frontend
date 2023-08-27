import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchCategories, fetchBrands, fetchSelectedProduct, createProduct, updateProduct } from './productAPI';

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null
};



export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
    return response.data;
  }
);


export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);


export const fetchSelectedProductAsync = createAsyncThunk(
  'product/fetchSelectedProduct',
  async (id) => {
    const response = await fetchSelectedProduct(id);
    return response.data;
  }
);


export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  },

  extraReducers: (builder) => {
    builder

      // filtered products
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      // brands
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })

      // categories
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })

      // selected product
      .addCase(fetchSelectedProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSelectedProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })


      // create product 
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })

      // update product 
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload;
      })

  },
});

export const { clearSelectedProduct } = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductByID = (state) => state.product.selectedProduct;

export const selectTotalItems = (state) => state.product.totalItems;

export const selectProductListStatus = (state)=> state.product.status;

export default productSlice.reducer;
