import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-3 h-[100dvh]">
      <div className="w-full rounded-lg shadow-md sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900">
            Sign Up
          </h1>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};

export default Register;
