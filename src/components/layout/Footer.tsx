'use client';

function Footer() {
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Docs', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2025 Pulseboard. All rights reserved.
          </div>
          <nav className="flex flex-wrap items-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

