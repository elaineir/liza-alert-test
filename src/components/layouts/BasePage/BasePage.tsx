import './BasePage.css';
import { ReactNode } from 'react';
import { Footer, Header } from '../../common';

interface BasePageProps {
  children: ReactNode;
}

function BasePage({ children }: BasePageProps): JSX.Element {
  return (
    <>
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </>
  );
}

export default BasePage;
