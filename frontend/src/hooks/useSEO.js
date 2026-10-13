import { useEffect } from 'react';

/**
 * Custom hook to dynamically update document title and meta description for SEO
 * @param {string} title - Page title (will be suffixed with " | ATS Skill Certification")
 * @param {string} description - Meta description for search engines
 * @param {string} canonicalPath - Optional relative path for canonical tag (e.g. "/courses")
 */
export function useSEO({ title, description, canonicalPath = '' }) {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = 'ATS Skill Certification';
    if (title) {
      document.title = title.includes(baseTitle) ? title : `${title} — ${baseTitle}`;
    } else {
      document.title = 'ATS Skill Certification — Validate Your Skills. Showcase Your Achievement.';
    }

    // 2. Update Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    // 3. Update OG Title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', document.title);
      }
    }

    // 4. Update Canonical URL
    if (canonicalPath !== undefined) {
      const fullUrl = `https://ats-skill-certification.vercel.app${canonicalPath}`;
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', fullUrl);

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', fullUrl);
      }
    }
  }, [title, description, canonicalPath]);
}
