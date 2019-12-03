export function get(req, res) {
  const urls = [
    '/',
    '/chi-siamo/',
    '/blog/',
    '/il-consulente-risponde/',
    '/la-consulenza-online/',
    '/sono-qui-per-te/',
    '/il-consulente-in-studio/',
    '/formazione-aziendale/',
    '/formazione-imprenditoriale/',
    '/apprendistato/'
  ].map(item => `<url>
    <loc>${item}</loc>
  </url>`).join("\n")

  res.setHeader('Cache-Control', `max-age=0, s-max-age=${600}`);
  res.setHeader('Content-Type', 'application/rss+xml');

	res.end(`<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`);
}
