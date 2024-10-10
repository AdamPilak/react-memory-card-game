import Navigation from "../components/Navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
