import createAsyncSlice from './helper/createAsyncSlice'

const slice = createAsyncSlice({
  name: 'token',
  fetchConfig: (user) => {}
})
