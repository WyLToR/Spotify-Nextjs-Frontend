export default function InputArtistContext({formik, text, file}: any) {
    return (
        <>
            <div className="p-4 md:p-5">
                <form
                    className="space-y-4"
                    action="#"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Artist name
                        </label>
                        <input
                            className={`bg-gray-50 border ${
                                formik.touched.name && !formik.errors.name
                                    ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                            } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                            required
                            type="text"
                            name="name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="System of a Down"
                        />
                        <label>
                            {!formik.errors.name && formik.touched.name ? "" : formik.errors.name}
                        </label>
                    </div>
                    <div>
                        <label
                            htmlFor="genre"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Artist Genre
                        </label>
                        <input
                            type="text"
                            name="genre"
                            id="genre"
                            placeholder="hard rock"
                            value={formik.values.genre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`bg-gray-50 border ${
                                formik.touched.genre && !formik.errors.genre
                                    ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                            } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                            required
                        />
                        <label>
                            {formik.touched.genre && !formik.errors.genre
                                ? ""
                                : formik.errors.genre}
                        </label>
                    </div>
                    <div>
                        <label
                            htmlFor="biography"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Artist Biography
                        </label>
                        <textarea
                            name="biography"
                            id="biography"
                            placeholder="biography"
                            value={formik.values.biography}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`bg-gray-50 border ${
                                formik.touched.biography && !formik.errors.biography
                                    ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                            } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                            required
                        />
                        <label>
                            {formik.touched.biography && !formik.errors.biography
                                ? ""
                                : formik.errors.biography}
                        </label>
                    </div>
                    <div>
            <label
              htmlFor="pictureFile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Album Picture
            </label>
            <input
              type="file"
              name="pictureFile"
              id="pictureFile"
              onChange={(e) => file.setFile(e.target.files[0])}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.pictureFile && !formik.errors.pictureFile
                  ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
              } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
            />
            <label>
              {formik.touched.pictureFile && !formik.errors.pictureFile
                ? ""
                : formik.errors.pictureFile}
            </label>
          </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        {text}
                    </button>
                </form>
            </div>
        </>
    )
}