module.exports = {
  theme: {
    fontFamily: {
      body: ['Roboto'],
      head: ['Roboto']
    },
    extend: {
      opacity:{
        60: 0.6,
        66: 0.666,
      },
      fontSize:{
        'base': '0.98rem'
      },
      colors: {
        'primary': {
          default: '#333',
          lighter: '#666',
          darker: '#111',
          transparent: '#3338'
        },
        'secondary':{
          default: '#555',
          lighter: '#888',
          darker: '#222',
          transparent: '#5558'
        },
        black: '#222'
      },
      boxShadow: {
        carousel: 'inset 0rem 0rem 2rem 0.5rem rgba(0,0,0,0.6)'
      },
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape': {'raw': '(orientation: landscape)'}
      }
    }
  },
  variants: {},
  plugins: []
}
