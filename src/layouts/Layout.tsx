import Navigation from "../components/Navigation";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
