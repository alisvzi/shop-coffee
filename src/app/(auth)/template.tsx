export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fade-in mx-auto px-0 flex flex-col md:flex-row max-w-6xl bg-base-50 my-16 rounded-lg border border-base-content/10 shadow-md">
      <section className="flex-1 p-8 md:p-10 flex flex-col">{children}</section>
      <section className="flex-1 p-8 md:p-10">
        <div className="bg-primary rounded-lg shadow-lg text-white flex flex-col items-center justify-around text-center p-6">
          <h5 className="text-xl">قهوه ست؛ خرید قهوه تخصصی</h5>
          <div className="bg-primary/50 p-2 rounded-full w-64 h-64 my-6 flex justify-center items-center">
            <img
              src="/images/coffee-svg-2.svg"
              alt="قهوه ست"
              className="w-56 h-56 object-contain"
            />
          </div>
          <div>
            <h4 className="text-xl">عطر و طعم حرفه‌ای‌ها</h4>
            <h6 className="mt-3">به دنیای قهوه خوش آمدید</h6>
          </div>
        </div>
      </section>
    </div>
  );
}
