import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileForm from "@/components/forms/ProfileForm";
import ROUTES from "@/constants/routes";
import { getUser } from "@/lib/actions/user.action";
import { IUserDoc } from "@/database/user.model";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const { success, data } = await getUser({ userId: session.user.id });
  if (!success) redirect(ROUTES.SIGN_IN);

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <section className="mt-2.5 flex w-full flex-col items-start justify-center px-2">
        <h1 className="text-primary-400 text-5xl font-bold">
          Edit <span className="text-secondary-500">Profile</span>
        </h1>

        <p className="text-secondary-100 text-3xl font-normal">
          Update your personal and subscription information.
        </p>
      </section>

      <div className="flex w-full grow-1 flex-col items-center gap-3 px-3 py-2">
        <ProfileForm user={data?.user as IUserDoc} />
      </div>
    </div>
  );
};

export default Page;
