import AccountDetails from "@/private/detalhes/components/AccountDetails";
import ProfileDetails from "@/private/detalhes/components/ProfileDetails";

export default function Settings() {
  return (
    <div className="mx-8 p-4 flex md:*:w-fit *:w-full flex-wrap gap-8 items-start">
      <ProfileDetails />
      <AccountDetails />
      {/* <PasswordDetails /> */}
    </div>
  );
}
