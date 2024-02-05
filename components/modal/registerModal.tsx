import { useFormik } from "formik";
import { hidden } from "next/dist/lib/picocolors";
import { useState } from "react";
import useRegister from "@/src/hooks/auth/useRegister";
import { Register } from "@/src/interfaces/hookInterfaces/auth/register";
import registerSchema from "@/src/schemas/registerSchema";

export default function RegisterModal(props: any) {
  const formik = useFormik({
    onSubmit: (formData: Register) => {
      mutate(formData);
      setShowPw(false);
      formik.resetForm();
      isSuccess && !isError && !data?.error
        ? setTimeout(() => {
            props.setRegisterModal(!props.registerModal);
          }, 1000)
        : "";
    },
    initialValues: {
      email: "",
      password: "",
      passwordAgain: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerSchema,
  });
  const [showPw, setShowPw] = useState(false);
  const { mutate, isSuccess, isError, data } = useRegister("auth/register");
  return (
    <>
      {!props.registerModal || (
        <>
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${
              !props.registerModal ? hidden : ""
            } overflow-y-auto overflow-x-hidden fixed top-50 right-50 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {data?.error ? (
                      <span className="text-red-500">{data?.error}</span>
                    ) : (
                      "RegisterModal into our platform"
                    )}
                  </h3>
                  <button
                    type="button"
                    onClick={() => props.setRegisterModal(!props.registerModal)}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form
                    className="space-y-4"
                    action="#"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        className={`bg-gray-50 border ${
                          formik.touched.email && !formik.errors.email
                            ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                        } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        required
                        type="email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="name@example.com"
                      />
                      <label>
                        {formik.touched.email && !formik.errors.email
                          ? ""
                          : formik.errors.email}
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your password
                      </label>
                      <div className={`flex`}>
                        <input
                          type={!showPw ? "password" : "text"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`bg-gray-50 border ${
                            formik.touched.password && !formik.errors.password
                              ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                          } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                          required
                        />
                        <button
                          type="button"
                          className={`w-7`}
                          onClick={() => setShowPw(!showPw)}
                        >
                          {!showPw ? "👁" : "🕵️‍♀️"}
                        </button>
                      </div>
                      <label>
                        {formik.touched.password && !formik.errors.password
                          ? formik.errors.password
                          : "The password need: A-Z, a-z, 0-9, Special Character"}
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password again
                      </label>
                      <input
                        type={!showPw ? "password" : "text"}
                        name="passwordAgain"
                        id="passwordAgain"
                        placeholder="••••••••"
                        value={formik.values.passwordAgain}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border ${
                          formik.touched.passwordAgain &&
                          !formik.errors.passwordAgain
                            ? "border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            : "border-red-300 text-red-900 dark:bg-red-600 dark:border-red-500 dark:placeholder-red-400 dark:text-red"
                        } text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        required
                      />
                      <label>
                        {formik.touched.passwordAgain &&
                        !formik.errors.passwordAgain
                          ? ""
                          : formik.errors.passwordAgain}
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Firstname
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="John"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                        text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Lastname
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Doe"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                        text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                        
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Register
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Do you have account?
                      <a
                        href="#"
                        className="text-red-700 hover:underline dark:text-red-500"
                        onClick={() => {
                          props.setLoginModal(!props.loginModal);
                          props.setRegisterModal(!props.registerModal);
                        }}
                      >
                        Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
