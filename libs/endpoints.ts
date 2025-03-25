export const endpoints = {
  user: {
    shipping: {
      getShippingFee: "/shipping/fee",
    },
    order: {
      createOrder: "/orders",
      trackOrder: "/order",
    },
    product: {
      products: "/products",
      getProduct: "/product",
    },
  },

  admin: {
    profile: {
      getProfile: "/get-profile",
    },
    auth: {
      login: "/admin/login",
      accountEdit: "/admin/account",
    },
    product: {
      createProduct: "/product",
      editProduct: "/product",
      deleteProduct: "/product",
      getProduct: "/product",
      getAllProduct: "/all-products",
    },
    order: {
      orders: "/orders",
      editStatus: "/orders-status",
    },
  },
};
