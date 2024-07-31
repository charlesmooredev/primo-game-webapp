import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export function AppWrapper({ children }: Props) {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-full lg:w-[1240px] py-[100px]">{children}</div>
    </div>
  );
}
