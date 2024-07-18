import { useRef } from "react";
import { Model } from "../../components/Model/Model";
import {
  
  useAddProductMutation,
  useGetCategoryQuery,
  useGetProductQuery,
} from "../../redux/api/baseApi";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title?: string;
  image?: string;
  category?: string;
  price?: number;
  quantity?: number;
  rating?: number;
  description?: string;
};

export const Product = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const productModalRef = useRef<HTMLDivElement>(null);
  const { data: products, isError, isLoading } = useGetProductQuery(undefined);
  const [productInfoHandle, { isSuccess}] = useAddProductMutation();
  const { data: category } = useGetCategoryQuery(undefined);

  if (isError || isLoading) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    productModalRef.current?.classList.toggle("hidden");
  };

  //   console.log("products", products);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const { title, category, image, price, quantity, rating, description } =
      data;
    const productInfo = {
      title,
      categoryId: category,
      image,
      price: Number(price),
      quantity: Number(quantity),
      rating,
      description,
    };
    const insertProduct = await productInfoHandle(productInfo);
    console.log("insertProduct", insertProduct);
    
    if (insertProduct) {
      toggleModal();
      reset();
    }

    console.log("productInfo", productInfo);
  };

  return (
    <>
      <div className="py-10 px-20">
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-3">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Product List
              </h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        SI
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Image
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Category
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Quantity
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Rating
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.data?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.image}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.categoryId}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.price}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.quantity}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.rating}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex gap-2">
                            <button
                              // onClick={() => handleCategoryEdit(item)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Edit
                            </button>
                            <button
                              // onClick={() => handleDeleteCategory(item?._id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Model>
        <Model>
          <div
            className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
            ref={productModalRef}
          >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
              </span>

              <div
                className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="text-2xl leading-6 font-medium text-gray-900 text-center pt-5">
                    Add Product
                  </h1>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="w-full space-y-2">
                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Product Name
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <input
                            type="text"
                            id="title"
                            {...register("title", { required: true })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter Title"
                          />
                          {errors.title && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Product image
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <input
                            type="text"
                            {...register("image", { required: true })}
                            id="image"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter image url"
                          />
                          {errors.image && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Product Category
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <select
                            {...register("category", { required: true })}
                            id="category"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option>---Select Category---</option>
                            {category.data.map((itemC: any, index: number) => (
                              <option key={index} value={itemC._id}>
                                {itemC.categoryName}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Product Price
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <input
                            type="number"
                            {...register("price", { required: true })}
                            id="price"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter price"
                          />
                          {errors.price && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Quantity
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <input
                            type="number"
                            {...register("quantity", { required: true })}
                            id="quantity"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter quantity"
                          />
                          {errors.quantity && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Rating
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <input
                            type="number"
                            {...register("rating", { required: true })}
                            id="rating"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter rating"
                          />
                          {errors.rating && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-xl leading-6 font-medium text-gray-900 w-[30%]"
                          id="modal-headline"
                        >
                          Product description
                        </h3>
                        <div className="mt-2 w-[60%]">
                          <textarea
                            {...register("description", { required: true })}
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter category"
                          ></textarea>
                          {errors.description && (
                            <span className="text-red-500">
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-200 px-4 py-3 text-right">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                    >
                      <i className="fas fa-times"></i> Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
                    >
                      <i className="fas fa-plus"></i> Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Model>
      </Model>
    </>
  );
};
