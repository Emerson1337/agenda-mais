import AccountDetails from "@/private/detalhes/components/AccountDetails";
import ProfileDetails from "@/private/detalhes/components/ProfileDetails";

export default function Settings() {
  return (
    <div className="mx-8 flex flex-wrap gap-4 items-start">
      <AccountDetails />
      <ProfileDetails />
    </div>
  );
}
