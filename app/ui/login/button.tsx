import Image from 'next/image';
import loginIcon from "@/app/ui/assets/login-icon.svg";

export default function LoginButton() {
  return (
    <button>
      <Image
        src={loginIcon}
        alt={""}
        width={24}
        height={24}
      />
      <span>Entrar com o Google</span>
    </button>
  )
}