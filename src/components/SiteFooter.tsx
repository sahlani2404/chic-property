export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-3xl mb-3">Linear Property</div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Studio properti yang menghubungkan keluarga Indonesia dengan hunian
            terbaiknya — dari villa tropis hingga apartemen kota.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Jelajahi</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Properti</li><li>Tentang Kami</li><li>Layanan</li><li>Jurnal</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 text-foreground">Kontak</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>muhmmdidris11@gmail.com</li>
            <li><a href="https://wa.me/6285697241050" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">+62 856 9724 1050</a></li>
            <li>Jakarta · Bali · Bandung</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Linear Property. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
