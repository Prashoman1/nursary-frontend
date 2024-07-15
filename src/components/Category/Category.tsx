import Swal from "sweetalert2";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/baseApi";

import { useEffect, useRef, useState } from "react";
import { Model } from "../Model/Model";

export const Category = ({ category }: { category: any }) => {
  const [itemCategory, setItemCategory] = useState<any>(null);
  //   const modalUpdateCRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const refCatgoryU = useRef<HTMLFormElement>(null);
  const [deleteCategory, { isError, isSuccess }] = useDeleteCategoryMutation();
  const [handleEdit] = useUpdateCategoryMutation();
  const handleCategoryEdit = (item: any) => {
    setItemCategory(item);
    // refCatgoryU.current?.reset();
    // modalRef.current?.classList.toggle("hidden");
    handleModelCategory();
  };
  useEffect(() => {
    if (modalRef.current?.classList.contains("hidden")) {
      modalRef.current?.classList.toggle("hidden");
    }
  }, [itemCategory]);

  const handleModelCategory = () => {
    refCatgoryU.current?.reset();
    // console.log("modalUpdateCRef.current", modalUpdateCRef.current);

    modalRef.current?.classList.toggle("hidden");
  };

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData: any = deleteCategory(id);
        console.log(
          "isError",
          isError + "isSuccess:" + isSuccess,
          "deleteData:",
          deleteData
        );
        if (deleteData) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleCategoryUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("asi");

    const updateCategory = e.currentTarget.updateCategory.value;
    const updateInfoCategory = {
      id: itemCategory._id,
      categoryName: updateCategory,
    };
    // console.log("updateCategory", updateCategory);
    await handleEdit(updateInfoCategory);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-3">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Category List
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
                      Category Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item?.categoryName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCategoryEdit(item)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(item?._id)}
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
        {itemCategory && (
          <Model>
            <div
              className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden"
              ref={modalRef}
            >
              <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                  &#8203;
                </span>
                <div
                  className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <form onSubmit={handleCategoryUpdate} ref={refCatgoryU}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="w-full sm:flex sm:items-start">
                        <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900"
                            id="modal-headline"
                          >
                            Add Category
                          </h3>
                          <div className="mt-2 w-[60%]">
                            <input
                              type="text"
                              name="updateCategory"
                              id="category"
                              defaultValue={itemCategory?.categoryName}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              placeholder="Enter category"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-200 px-4 py-3 text-right">
                      <button
                        onClick={handleModelCategory}
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
        )}
      </div>
    </>
  );
};
