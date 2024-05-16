interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
}
