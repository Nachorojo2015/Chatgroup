import { useState } from 'react';

const useLoginForm = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return {
    form,
    handleChange
  };
};

export default useLoginForm;
