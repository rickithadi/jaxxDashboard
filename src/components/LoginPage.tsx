import { useEffect, useState } from "react";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (email: string, password: string) => {
    console.log(email, password);
  };
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form>
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
            id="exampleInputPassword1"
            placeholder="Password"
          />
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
      ease-in-out"
          disabled={!email || !password}
          onClick={(e) => {
            login(email, password);
            e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
