import ContactForm from "./_component/ContactForm/ContactForm";
import Information from "./_component/Information/Information";

const page = async () => {
  return (
    <>
      <div className={"container p-10 my-10 flex flex-col md:flex-row gap-12"}>
        <Information />
        <ContactForm />
      </div>
    </>
  );
};

export default page;
