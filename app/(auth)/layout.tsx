import UnprotectedAuthRoute from "@/components/major/UnprotectedAuthRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join SMSureConnect - Start Meeting Sugar Mommies Today",
  description:
    "Create your free account on SMSureConnect. Meet verified, successful women aged 40-80 seeking meaningful connections. Join the #1 premium dating platform.",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <UnprotectedAuthRoute>{children}</UnprotectedAuthRoute>;
};

export default AuthLayout;
