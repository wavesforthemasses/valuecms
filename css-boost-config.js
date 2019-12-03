const custom = {
  font: {
    schema: {
      body: 'font-family: Roboto;',
      head: 'font-family: Roboto;'
    }
  }
}

const inSchema = (item, key) => {
  if(custom[key] && custom[key].schema && item in custom[key].schema) return custom[key].schema[`${item}`]
  if(mixins[key] && mixins[key].schema && item in mixins[key].schema) return mixins[key].schema[`${item}`]
  return false
}

const mixins = {
  many: {
    rules: a => {
      if(!a) return ""
      let rules = ""
      a.forEach(rule => {
        if(rule in mixins) rules = rules.concat(mixins[rule].rules())
      })
      return rules
    }
  },
  font: {
    rules: (...vars) => {
      let rules = [], family = [], r
      vars.forEach((v, i) => {
        if(r = inSchema(v, 'font')){ rules.push(r) }else{ family.push(v) }
      })
      return `${rules.join("")}${family.length > 0 ? `font-family:${family.join(", ")};` : ""}`
    },
    schema: {
      italic: 'font-style: italic;',
      oblique: 'font-style: oblique;',
      bold: 'font-weight: bold;',
      regular: 'font-weight: normal;',
      bolder: 'font-weight: bolder;',
      lighter: 'font-weight: lighter;',
      '100': 'font-weight: 100;',
      '200': 'font-weight: 200;',
      '300': 'font-weight: 300;',
      '400': 'font-weight: 400;',
      '500': 'font-weight: 500;',
      '600': 'font-weight: 600;',
      '700': 'font-weight: 700;',
      '800': 'font-weight: 800;',
      '900': 'font-weight: 900;',
      'xs': 'font-size: 0.75rem;',
      'sm': 'font-size: 0.875rem;',
      'base': 'font-size: 1rem;',
      'lg': 'font-size: 1.125rem;',
      'xl': 'font-size: 1.25rem;',
      '2xl': 'font-size: 1.5rem;',
      '3xl': 'font-size: 1.875rem;',
      '4xl': 'font-size: 2.25rem;',
      '5xl': 'font-size: 3rem;',
      '6xl': 'font-size: 4rem;'
    }
  },
  z: {
    rules: a => `z-index:${a || 0};`
  },
  flex: {
    rules: (...vars) => {
      let rules = [], align = [], r
      vars.forEach((v, i) => {
        if(r = inSchema(v, 'flex')){ rules.push(r) }else{ align.push(v) }
      })
      rules = rules.join("")
      if(align.length > 0){
        if(align.length == 2){
          rules = rules.concat(mixins.items.rules(align[0]))
          rules = rules.concat(mixins.justify.rules(align[1]))
        }else{
          rules = rules.concat(mixins['place-items'].rules(align))
        }
      }
      return `display: flex; ${rules}`
    },
    schema: {
      '1': 'flex: 1 1 0%;',
      'auto': 'flex: 1 1 auto;',
      'none': 'flex: none;',
      'initial': 'flex: 0 1 auto;',
      'col': 'flex-direction: column;',
      '-col': 'flex-direction: column-reverse;',
      'row': 'flex-direction: row;',
      '-row': 'flex-direction: row-reverse;',
    }
  },
  bg: {
    rules: (a, b) => (mixins.bg.schema[a] || b) + ";",
    schema: {
      'cover': 'background-position: center; background-repeat: no-repeat; background-size: cover;',
      '100%': 'background-position: center; background-repeat: no-repeat; background-size: 100%;',
      'contain': 'background-position: center; background-repeat: no-repeat; background-size: contain;',
      'parallax': 'background-position: center; background-repeat: no-repeat; background-size: cover; background-attachment: fixed;'
    }
  },
  full: {
    rules: (a, b) => (mixins.full.schema[a] || mixins.full.schema['default']).replace("0", b || "0") + ";",
    schema: {
      'x': 'right:0;left:0',
      'y': 'top:0;bottom:0',
      '0': 'top:0;right:0;bottom:0;left:0',
      'default': 'top:0;right:0;bottom:0;left:0'
    }
  },
  top: {
    rules: a => `top: ${a || 0};`
  },
  left: {
    rules: a => `left: ${a || 0};`
  },
  bottom: {
    rules: a => `bottom: ${a || 0};`
  },
  right: {
    rules: a => `right: ${a || 0};`
  },
  "place-items": {
    rules: (a, b) => `${mixins.flex.rules()}${mixins.items.rules(a)}${mixins.justify.rules(b || a)}`
  },
  justify: {
    rules: (...vars) => {
      let rules = [], r
      vars.forEach((v, i) => {
        if(r = inSchema(v, 'justify')){ rules.push(r) }
      })
      return rules.length > 0 ? rules.join("") : "justify-content: flex-start;"
    },
    schema: {
      'center': 'justify-content: center;',
      'between': 'justify-content: space-between;',
      'end': 'justify-content: flex-end;',
      'around': 'justify-content: space-around;',
      'initial': 'justify-content: initial;',
      'inherit': 'justify-content: inherit;',
      'start': 'justify-content: flex-start;'
    }
  },
  items: {
    rules: (...vars) => {
      let rules = [], r
      vars.forEach((v, i) => {
        if(r = inSchema(v, 'items')){ rules.push(r) }
      })
      return rules.length > 0 ? rules.join("") : "align-items: stretch;"
    },
    schema: {
      'center': 'align-items: center;',
      'start': 'align-items: flex-start;',
      'end': 'align-items: flex-end;',
      'baseline': 'align-items: baseline;',
      'initial': 'align-items: initial;',
      'inherit': 'align-items: inherit;',
      'stretch': 'align-items: stretch;'
    }
  },
  "rounded-t": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-left-radius:')}${mixins.rounded.rules(a).replace('border-radius:', 'border-top-right-radius:')}`
  },
  "rounded-l": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-left-radius:')}${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-left-radius:')}`
  },
  "rounded-b": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-left-radius:')}${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-right-radius:')}`
  },
  "rounded-r": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-right-radius:')}${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-right-radius:')}`
  },
  "rounded-tl": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-left-radius:')}`
  },
  "rounded-lt": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-left-radius:')}`
  },
  "rounded-br": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-right-radius:')}`
  },
  "rounded-rb": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-right-radius:')}`
  },
  "rounded-tr": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-right-radius:')}`
  },
  "rounded-rt": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-top-right-radius:')}`
  },
  "rounded-bl": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-left-radius:')}`
  },
  "rounded-lb": {
    rules: (a) => `${mixins.rounded.rules(a).replace('border-radius:', 'border-bottom-left-radius:')}`
  },
  rounded: {
    rules: (a) => {
      let r = inSchema(a, 'rounded')
      if(r) return `border-radius:${r};`
      mixins.rounded.schema['1'] = inSchema('1', 'rounded')
      return `border-radius:${mixins.rounded.schema['default'](a)};`
    },
    schema: {
      'none': 'none',
      'full': '9999px',
      '1': '0.125rem',
      'default': (a) => {
        let match
        if(match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*$/)){
          const num = parseFloat(match[1])
          if(match = mixins.rounded.schema['1'].match(/^[ \t]*([\-]*[0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  wh: {
    rules: (a) => `${mixins.w.rules(a)}${mixins.h.rules(a)}`
  },
  hw: {
    rules: (a) => `${mixins.w.rules(a)}${mixins.h.rules(a)}`
  },
  "max-w": {
    rules: (a) => `max-${mixins.w.rules(a)}`
  },
  "max-h": {
    rules: (a) => `max-${mixins.h.rules(a)}`
  },
  "min-w": {
    rules: (a) => `min-${mixins.w.rules(a)}`
  },
  "min-h": {
    rules: (a) => `min-${mixins.h.rules(a)}`
  },
  w: {
    rules: (a) => {
      let r = inSchema(a, 'w')
      if(r) return `width:${r};`
      mixins.w.schema['1'] = inSchema('1', 'w')
      return `width:${mixins.w.schema['default'](a) || mixins.w.schema['1']};`
    },
    schema: {
      'auto': 'auto',
      'screen': '100vw',
      'full': '100%',
      '1': '0.25rem',
      'default': (a) => {
        let match
        if(match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*\/[ \t]*([0-9]+)[ \t]*$/)){
          if(parseInt(match[2])>0) return `${100*parseInt(match[1])/parseInt(match[2])}%`
        }else if(match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*$/)){
          const num = parseFloat(match[1])
          if(match = mixins.w.schema['1'].match(/^[ \t]*([\-]*[0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  h: {
    rules: (a) => {
      let r = inSchema(a, 'h')
      if(r) return `height:${r};`
      mixins.h.schema['1'] = inSchema('1', 'h')
      return `height:${mixins.h.schema['default'](a) || mixins.h.schema['1']};`
    },
    schema: {
      'auto': 'auto',
      'screen': '100vh',
      'full': '100%',
      '1': '0.25rem',
      'default': (a) => {
        let match
        if(match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*\/[ \t]*([0-9]+)[ \t]*$/)){
          if(parseInt(match[2])>0) return `${100*parseInt(match[1])/parseInt(match[2])}%`
        }else if(match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*$/)){
          const num = parseFloat(match[1])
          if(match = mixins.h.schema['1'].match(/^[ \t]*([\-]*[0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  m: {
    rules: (a) => {
      let r = inSchema(a, 'm')
      if(r) return `margin:${r};`
      mixins.m.schema['1'] = inSchema('1', 'm')
      return `margin:${mixins.m.schema['default'](a) || mixins.m.schema['1']};`
    },
    schema: {
      'auto': 'auto',
      '1': '0.25rem',
      'default': (a) => {
        let match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*$/)
        if(match){
          const num = parseFloat(match[1])
          if(match = mixins.m.schema['1'].match(/^[ \t]*([\-]*[0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  mt: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-top:")}`
  },
  mr: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-right:")}`
  },
  mb: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-bottom:")}`
  },
  ml: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-left:")}`
  },
  my: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-top:")}${mixins.m.rules(a).replace("margin:", "margin-bottom:")}`
  },
  mx: {
    rules: (a) => `${mixins.m.rules(a).replace("margin:", "margin-right:")}${mixins.m.rules(a).replace("margin:", "margin-left:")}`
  },
  p: {
    rules: (a) => {
      let r = inSchema(a, 'p')
      if(r) return `padding:${r};`
      mixins.p.schema['1'] = inSchema('1', 'p')
      return `padding:${mixins.p.schema['default'](a) || mixins.p.schema['1']};`
    },
    schema: {
      'auto': 'auto',
      '1': '0.25rem',
      'default': (a) => {
        let match = a.match(/^[ \t]*([0-9]+)[ \t]*$/)
        if(match){
          const num = parseFloat(match[1])
          if(match = mixins.p.schema['1'].match(/^[ \t]*([0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  pt: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-top:")}`
  },
  pr: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-right:")}`
  },
  pb: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-bottom:")}`
  },
  pl: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-left:")}`
  },
  py: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-top:")}${mixins.p.rules(a).replace("padding:", "padding-bottom:")}`
  },
  px: {
    rules: (a) => `${mixins.p.rules(a).replace("padding:", "padding-right:")}${mixins.p.rules(a).replace("padding:", "padding-left:")}`
  },
  b: {
    rules: (...vars) => {
      let rules = [], size = [], r
      vars.forEach((v, i) => {
        if(r = inSchema(v, 'b')){ rules.push(r) }else{ size.push(v) }
      })
      if(size.length > 0) size = size.filter(v => /^[ \t]*([\-]*[0-9]+)[ \t]*$/.test(v));
      if(size.length > 0){
        mixins.b.schema['1'] = inSchema('1', 'b')
        rules.push(mixins.b.schema['default'](size[0]))
      }
      if(rules.length === 0) rules.push(mixins.b.schema['1'])
      if(rules.length === 1 && /[0-9]+/i.test(rules[0])) rules.push('solid')
      return `border:${rules.join(" ")};`
    },
    schema: {
      'auto': 'auto',
      '1': '1px',
      'dotted': 'dotted',
      'dashed': 'dashed',
      'solid': 'solid',
      'double': 'double',
      'groove': 'groove',
      'ridge': 'ridge',
      'inset': 'inset',
      'outset': 'outset',
      'none': 'none',
      'hidden': 'hidden',
      'default': (a) => {
        let match = a.match(/^[ \t]*([\-]*[0-9]+)[ \t]*$/)
        if(match){
          const num = parseFloat(match[1])
          if(match = mixins.b.schema['1'].match(/^[ \t]*([\-]*[0-9\.]+)[ \t]*([a-zA-Z%]+)[ \t]*$/)){
            return `${num*parseFloat(match[1])}${match[2].replace(/[ \t]+/, "")}`
          }
        }
        return a
      }
    }
  },
  bt: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-top:")}`
  },
  br: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-right:")}`
  },
  bb: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-bottom:")}`
  },
  bl: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-left:")}`
  },
  by: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-top:")}${mixins.b.rules(a, b, c).replace("border:", "border-bottom:")}`
  },
  bx: {
    rules: (a, b, c) => `${mixins.b.rules(a, b, c).replace("border:", "border-right:")}${mixins.b.rules(a, b, c).replace("border:", "border-left:")}`
  },
  fixed: {
    rules: (...a) => `position: fixed;${mixins.many.rules(a)}`
  },
  absolute: {
    rules: (...a) => `position: absolute;${mixins.many.rules(a)}`
  },
  relative: {
    rules: (...a) => `position: relative;${mixins.many.rules(a)}`
  }
}

export default {
  mixins: mixins
}
