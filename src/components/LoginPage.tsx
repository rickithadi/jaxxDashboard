import { useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email) setErrors({ ...errors, email: "Email is required" });
    if (!password) setErrors({ ...errors, password: "Password is required" });
    console.log(email, password);
    // api post
    // setErrors({ ...errors, general: "Invalid email or password" });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        {errors.general && (
          <div className="mb-3 text-normal text-red-500 ">{errors.general}</div>
        )}
        <form onSubmit={login}>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="mb-3 text-normal text-red-500 ">
                {errors.email}
              </div>
            )}

            <small id="emailHelp" className="block mt-1 text-xs text-gray-600">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group mb-6">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
            />
            {errors.password && (
              <div className="mb-3 text-normal text-red-500 ">
                {errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      disabled:opacity-25
      ease-in-out"
            disabled={!email || !password}
            onClick={(e) => {
              login();
              e.preventDefault();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
