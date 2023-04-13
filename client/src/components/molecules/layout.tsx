import Footer from '../atoms/marginals/Footer';
import NavBar from '../atoms/marginals/Navbar';
import { Container } from '../atoms/shared';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    <NavBar />
    <main>
      <Container>{children}</Container>
    </main>
    <Footer />
  </>
);

export default Layout;
