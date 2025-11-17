import { authUser } from "@/utils/serverHelpers";
import PanelTitle from "../../_components/PanelTitle";
import AccountDetailsForm from "./AccountDetailsForm";

const AccountDetail = async () => {
  const { name, phone, email, password } = await authUser();

  return (
    <>
      <PanelTitle title="مشاهده و تغییر جزئیات حساب کاربری" />
      <div className="max-w-3xl mx-auto">
        <AccountDetailsForm {...{ name, phone, email, password }} />
      </div>
    </>
  );
};

export default AccountDetail;
