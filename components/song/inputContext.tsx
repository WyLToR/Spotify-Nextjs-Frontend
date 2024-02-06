import { FormikValues } from "formik";

export default function InputSongContext({ formik, text, file }: {formik: FormikValues, text: string, file: any | null}) {
  return (
    <>
      <div className="p-4 md:p-5">
        <form className="space-y-4" action="#" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Song Title
            </label>
            <input
              className={`bg-gray-50 border ${
                formik.touched.title && !formik.errors.title
                  ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
              } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
              type="text"
              name="title"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="IOT"
            />
            <label>
              {!formik.errors.title && formik.touched.title
                ? ""
                : formik.errors.title}
            </label>
          </div>
          <div>
            <label
              htmlFor="songFile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Song File
            </label>
            <input
              type="file"
              name="songFile"
              id="songFile"
              onChange={(e) => file.setFile(e.target.files[0])}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${
                formik.touched.songFile && !formik.errors.songFile
                  ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
              } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
            />
            <label>
              {formik.touched.songFile && !formik.errors.songFile
                ? ""
                : formik.errors.songFile}
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
  );
}
