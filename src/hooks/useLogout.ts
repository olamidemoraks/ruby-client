import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { COOKIE_KEYS } from "../../libs/data";

function useLogout() {
  const { replace } = useRouter();

  const logout = () => {
    deleteCookie(COOKIE_KEYS.TOKEN);
    deleteCookie(COOKIE_KEYS.IS_REGISTERED);
    replace("/login");
  };

  return {
    logout,
  };
}

export { useLogout };
