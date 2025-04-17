import './globals.css';
import LanguageSwitcher from '../components/LanguageSwitcher';

export const metadata = {
  title: 'Control Caravanes',
  description: 'App per gestionar l\'àrea de caravanes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body>
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}