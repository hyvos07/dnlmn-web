export const SITE_URL = 'https://www.dnlmn.dev';

export const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: 'Daniel Liman | dnlmn',
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Daniel Liman',
    alternateName: 'dnlmn',
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/self/1.jpg`,
    description: 'Software engineer based in Jakarta, Indonesia, building web applications and mobile apps.',
    jobTitle: 'Software Engineer',
    sameAs: [
      'https://github.com/hyvos07',
      'https://www.linkedin.com/in/danielliman',
      'https://x.com/hyvos_',
      'https://www.instagram.com/daniel.liman07/',
    ],
    affiliation: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Universitas Indonesia',
        alternateName: ['University of Indonesia', 'UI'],
        url: 'https://www.ui.ac.id/',
        department: {
          '@type': 'Organization',
          name: 'Fakultas Ilmu Komputer Universitas Indonesia',
          alternateName: ['Faculty of Computer Science', 'Fasilkom UI', 'CSUI'],
          url: 'https://cs.ui.ac.id/',
        },
      },
      {
        '@type': 'Organization',
        name: 'RISTEK Fasilkom UI',
        url: 'https://ristek.cs.ui.ac.id/',
      },
    ],
  },
};
