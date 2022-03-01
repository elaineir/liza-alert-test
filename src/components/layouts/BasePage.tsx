import { ReactNode } from 'react';
import Header from '../common/Header/Header';
import Footer from '../common/Footer/Footer';

interface BasePageProps {
  children: ReactNode;
}

function BasePage({ children }: BasePageProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default BasePage;
