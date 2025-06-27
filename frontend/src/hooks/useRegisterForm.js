import { useState } from "react";

const useRegisterForm = () => {
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    form,
    handleChange
  }
};

export default useRegisterForm
