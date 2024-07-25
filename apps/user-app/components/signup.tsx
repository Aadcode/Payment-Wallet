"use client";
import React, { useState, useEffect } from "react";
import Quote from "./Quote";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signinValidation } from "@repo/inputvalidation/Validation";
import signup from "../app/lib/actions/signup";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false); // For button loading state

  useEffect(() => {
    const validate = () => {
      const parsed = signinValidation.safeParse({
        email,
        name,
        number,
        password,
      });
      const errorMessages: { [key: string]: string } = {};
      if (!parsed.success) {
        parsed.error.errors.forEach((err) => {
          errorMessages[err.path[0] as string] = err.message;
        });
      }
      setErrors(errorMessages);
    };

    const timeout = setTimeout(validate, 300);
    return () => clearTimeout(timeout);
  }, [email, name, number, password]);

  const handleBlur = (field: string) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  const handleSignup = async () => {
    setLoading(true); // Set loading state while processing

    const result = signinValidation.safeParse({
      email,
      name,
      password,
      number,
    });

    if (result.success) {
      const res = await signup(email, name, password, number);
      setLoading(false); // Reset loading state

      if (res) {
        router.push("/api/auth/signin");
      } else {
        alert("Signup failed.User Already Exist"); // Show alert for signup failure
      }
    } else {
      setLoading(false); // Reset loading state
      alert("Please fill out all fields correctly."); // Generic error message for validation failure
    }
  };

  return (
    <div className="grid grid-cols-10 h-screen">
      <div className="col-span-6 bg-black flex flex-col justify-center">
        <div className="flex justify-center">
          <div>
            <div className="flex flex-col px-12 rounded-lg border border-gray-400">
              <div className="flex justify-center">
                <p className="text-white py-4 text-xl">Signup with Paytm</p>
              </div>
              <div className="px-4 py-1">
                <div className="text-white py-2 font-extralight text-l w-full">
                  <label htmlFor="email">Email</label>
                </div>
                <div>
                  <input
                    className="font-extralight p-1 bg-black text-white border-b border-white-100 rounded-lg"
                    placeholder="xyz@gmail.com"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="text-white text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="px-4 py-1">
                <div className="text-white py-2 font-extralight text-l w-full">
                  <label htmlFor="name">Name</label>
                </div>
                <div>
                  <input
                    className="font-extralight p-1 bg-black text-white border-b border-white-100 rounded-lg"
                    placeholder="Steve Rogers"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => handleBlur("name")}
                  />
                  {touched.name && errors.name && (
                    <p className="text-white text-sm">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="px-4 py-1">
                <div className="text-white py-2 font-extralight text-l w-full">
                  <label htmlFor="number">Mobile No</label>
                </div>
                <div>
                  <input
                    className="font-extralight p-1 bg-black text-white border-b border-white-100 rounded-lg"
                    placeholder="9977456456"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onBlur={() => handleBlur("number")}
                  />
                  {touched.number && errors.number && (
                    <p className="text-white text-sm">{errors.number}</p>
                  )}
                </div>
              </div>
              <div className="px-4 py-1">
                <div className="text-white py-2 font-extralight text-l w-full">
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input
                    className="font-extralight p-1 bg-black text-white border-b border-white-100 rounded-lg"
                    placeholder="Steve@123"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <p className="text-white text-sm">{errors.password}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSignup}
                className={`text-white font-semibold mt-3 rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <div className="text-white flex justify-center text-sm py-6">
                Already have an Account?{" "}
                <Link className="underline" href={"/api/auth/signin"}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 flex flex-col justify-center h-screen">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
