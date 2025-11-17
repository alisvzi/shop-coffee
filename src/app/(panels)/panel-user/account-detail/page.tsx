import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import PanelTitle from "../../_components/PanelTitle";
import AccountDetailsForm from "./AccountDetailsForm";

const AccountDetail = async () => {
  const user = await authUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <PanelTitle title="مشاهده و تغییر جزئیات حساب کاربری" />
      <div className="max-w-3xl mx-auto">
        <AccountDetailsForm
          name={user.name}
          phone={user.phone}
          email={user.email}
          password={user.password ?? ""}
        />
      </div>
    </>
  );
};

export default AccountDetail;
