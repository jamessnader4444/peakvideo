import ProductsByCategory from "./ProductsByCategory";
import ProductsByUser from "./ProductsByUser";

const ProductsConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
        },
        banner: {
          display: true,
        },
        footer: {
          display: true,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: null,
  routes: [
    {
      path: "/video_category/:categoryName/:categoryId",
      element: <ProductsByCategory />,
    },
    {
      path: "/productsByUser/:username/:userId",
      element: <ProductsByUser />,
    },
  ],
};

export default ProductsConfig;
