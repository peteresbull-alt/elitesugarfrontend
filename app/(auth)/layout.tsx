import UnprotectedAuthRoute from "@/components/major/UnprotectedAuthRoute";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <UnprotectedAuthRoute>{children}</UnprotectedAuthRoute>;
};

export default AuthLayout;
