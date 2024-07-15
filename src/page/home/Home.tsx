import { Category } from "../../components/Category/Category";
import {
  useAddCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/api/baseApi";
import { Model } from "../../components/Model/Model";
import { useRef, useState } from "react";

const Home = () => {
  const [categoryName, setCategoryName] = useState("");
  const { data: category, isLoading, error } = useGetCategoryQuery(undefined);
  const [categoryInfo] = useAddCategoryMutation();
  const modalRef = useRef<HTMLDivElement>(null);
  const categoryForm = useRef<HTMLFormElement>(null);

  const toggleModal = () => {
    setCategoryName("");
    categoryForm.current?.reset();
    modalRef.current?.classList.toggle("hidden");
  };

  if (!error && isLoading) {
    return <div>Loading...</div>;
  }
  console.log(category.data);

  const handaleCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const categoryInsertData = await categoryInfo({ categoryName });
    if (categoryInsertData) {
      toggleModal();
    }
  };

  return (
    <div className="px-20 mt-5 ">
      <div>
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Category
          </button>
        </div>
        <Category category={category.data} />
      </div>

      {/* model part here */}
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
              <form onSubmit={handaleCategorySubmit} ref={categoryForm}>
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
                          name="category"
                          id="category"
                          onChange={(e) => setCategoryName(e.target.value)}
                          defaultValue={categoryName}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Enter category"
                        />
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
    </div>
  );
};

export default Home;
