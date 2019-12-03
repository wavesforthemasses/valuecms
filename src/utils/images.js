const loaded = (src) => {
  const img = new Image();
  img.src = src;
  return img
}

const unwrap = (wrapper, img) => {
  wrapper.after(img);
  wrapper.remove();
  return img;
};

const wrap = (img, placeholder) => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('style', 'position: relative;');
  img.after(wrapper);
  wrapper.appendChild(img);
  wrapper.appendChild(placeholder);
  return wrapper;
};

const lazy = (node, params = {}) => {
  let host;
  let src;
  let smallsrc;
  src = node.tagName === 'IMG' ? node.getAttribute('lazySrc') : params.src;
  if(src){
    host = /^http([s]*)\:\/\/([^\/]+)\//.test(src) ? src.replace(/^http([s]*)\:\/\/([^\/]+)\/.*/im, "http$1://$2/") : "";
    src = src.replace(host, "")
    if(!(/^images/.test(src))) src = `images/${src}`
    smallsrc = src.replace(/^images/, "g")
    if(node.tagName === 'IMG'){
      const placeholder = node.cloneNode();
      placeholder.setAttribute('src', `${host}${smallsrc}`);
      const wrapper = wrap(node, placeholder);
      placeholder.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%; z-index: 10; filter: blur(5px);');
      const realSrc = `${host}${src}`
      loaded(realSrc).onload = () => {
        node.setAttribute('src', realSrc);
        node.removeAttribute('lazySrc');
        const style = placeholder.getAttribute('style');
        let i = 0
        for (let opacity = 1; opacity >=0; opacity -= 0.01)
        {
          setTimeout(() => placeholder.setAttribute('style', style + " opacity: " + opacity + ";") , 10 * i )
          i += 1;
        }
        setTimeout(() => unwrap(wrapper, node) , 10 * i )
      }
    }else{
      const placeholderDIV = node.querySelectorAll(".placeholder")[0];
      loaded(src).onload = () => {
        node.style.backgroundImage = `url('${src}')`
        node.classList.add('remove-placeholder')
        setTimeout(() => placeholderDIV.remove() , 10000 )
      }
    }
  }

  return {destroy(){}};
}

module.exports = {
  lazy: lazy
}
