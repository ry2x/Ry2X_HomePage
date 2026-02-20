/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'maxWidth': 'none',
            'color': '#374151',
            'lineHeight': '1.7',
            '[class~="lead"]': {
              color: '#6B7280'
            },
            'a': {
              'color': '#2563EB',
              'textDecoration': 'underline',
              'fontWeight': '500',
              '&:hover': {
                color: '#1D4ED8'
              }
            },
            'strong': {
              color: '#111827',
              fontWeight: '600'
            },
            'h1, h2, h3, h4, h5, h6': {
              color: '#111827',
              fontWeight: '600'
            },
            'blockquote': {
              color: '#6B7280',
              borderLeftWidth: '4px',
              borderLeftColor: '#E5E7EB',
              fontStyle: 'italic'
            },
            'code': {
              color: '#111827',
              backgroundColor: '#F3F4F6',
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em'
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            'pre': {
              backgroundColor: '#1F2937',
              color: '#F9FAFB',
              overflow: 'auto'
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0'
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
