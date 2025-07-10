const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <section className="p-6 max-w-screen-3xl 3xl:container">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
