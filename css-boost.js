import config from './css-boost-config'
let fileVars = config

const escapeRegExp = str => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");

const fns = {
  mixins: (c, content) => {
    let all = c.split(/[ \t]*\)[ \t]*/ig)
    let rules = ""
    for (const one of all) {
      if(!(/^[ \t]*$/.test(one))) rules = rules.concat(fns.mixin(one, content))
    }
    return rules;
  },
  mixin: (c, content) => {
    /*
      %test($z){
        z-index: $z;
      }%
      .class{
        @mixin: test(9999);
      }
    */
    c = c.replace(/[ \t]*\)/ig, "")
    let [name, vars] = c.split(/[ \t]*\([ \t]*/ig)
    vars = /.+,.+/ig.test(vars) ? vars.split(/[ \t]*,[ \t]*/ig) : [vars]

    const r = new RegExp(`\%${name}[ \\t]*\\(([^\\}\\)]*)\\)[ \\t]*\\{([^\\§]+)?\\}%`, "gim");
    const matches = content.matchAll(r);
    for (const match of matches) {
      fileVars['mixins'][name] = {
        vars: /.+,.+/ig.test(match[1]) ? match[1].split(/[ \t]*,[ \t]*/ig) : [match[1]],
        rules: match[2]
      }
    }
    let rules = fileVars['mixins'][name].rules
    if (typeof rules === "function"){
      rules = vars.length > 0 ? rules = rules(...vars) : rules = rules()
    }else{
      if(vars.length > 0) vars.forEach((v, i) => rules = rules.replace(new RegExp(escapeRegExp(fileVars['mixins'][name].vars[i]), 'g'), v));
    }
    return rules;
  },
  font: (c) => {
    const [font_face, weights] = c.split(/[ \t]*\:[ \t]*/i)
    const mdl = `typeface-${font_face.toLowerCase()}`;
    const fs = require('fs');
    let fonts = []
    if(fs.existsSync(`./static/fonts/${mdl}/index.css`)){
      const text = fs.readFileSync(`./static/fonts/${mdl}/index.css`,'utf8')
      const matches = text.matchAll(/\@font\-face[ \t\n\r]*\{([^\}]+)\}/img);
      const r = new RegExp(`${weights.replace(/[ \t]*,[ \t]*/, "|")}`, "gi");
      for (const match of matches) {
        if(r.test(match[0])) fonts.push(match[0].replace(/\.\/files\//ig, `/fonts/${mdl}/files/`))
      }
    }else{
      try {
        const path = require.resolve(mdl);
        console.error("\x1b[31m", "The font module seems to be installed")
        console.error("\x1b[31m", `Anyway the following file doesn't exist ./static/fonts/${mdl}/index.css`)
        console.error("\x1b[31m", `The following command could fix the problem`)
        console.error("\x1b[31m", `cp -r node_modules/${mdl} static/fonts`)
      } catch (err) {
        console.error("\x1b[31m", "You need to install the font required:")
        console.error("\x1b[31m", `npm install --save ${mdl}`)
        console.error("\x1b[31m", `cp -r node_modules/${mdl} static/fonts`)
      }
    }
    return fonts.join("")
  }
}

const preprocessor = [
  {
    style: ({ content, attributes, filename }) => {
      const matches = content.matchAll(/\@([a-zA-Z]+)\: ([^\;\n\r]+)\;/ig);
      for (const match of matches) {
        if(match[1] in fns){
          if(match[1] == 'font'){
            content = content.replace(match[0], "");
            content = `${fns[match[1]](match[2])}${content}`
          }else{
            content = content.replace(match[0], fns[match[1]](match[2], content));
          }
        }else{
          content = content.replace(match[0], "");
        }
      }
      content = content.replace(/\%([a-zA-Z]+)[ \t]*\(([^\}\)]*)\)[ \t]*\{([^\§]+)\}\%/img, "");
      return {
        code: content
      };
    }
  }
]

export default preprocessor
