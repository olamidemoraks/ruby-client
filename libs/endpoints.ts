export const endpoints = {
  user: {
    shipping: {
      getShippingFee: "/shipping/fee",
    },
    order: {
      account: "/account",
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
      changePassword: "/change-password",
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
    category: "/category",
  },
};
