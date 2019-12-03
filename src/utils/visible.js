// change from EventListener to IntersectionObserver

export const onVisible = (node, params) => {
  let status = false
  let breakStop = false
  let jail = !!params.jail
  let currentlyJailed = false
  let jailCurrent = 0
  let lastWheelTimestamp = Date.now()
  let wheelSum = 0
  let canWheel = false
  let scrollBack = 0
  let position = node.getBoundingClientRect()
  const quitNow = () => {
    if(currentlyJailed){
      if(params.jail.quit) params.jail.quit(node)
      node.hidden = true;
      setTimeout(() => {
        document.body.style.overflow = "inherit";
        window.scrollTo(0, scrollBack + 1);
        window.removeEventListener('wheel', wheelJail);
      }, 1000);
      currentlyJailed = false
    }
  }
  const wheelJail = (e) => {
    const wheelTimestamp = Date.now()
    wheelSum += 1
    if(wheelTimestamp - lastWheelTimestamp > 1000) canWheel = true
    if(wheelSum % 15 == 0 && canWheel){
      canWheel = false
      lastWheelTimestamp = wheelTimestamp
      if(jailCurrent < params.jail.steps - 1){
        if(e.deltaY < 0 && jailCurrent > 0){
          if(params.jail.step) params.jail.step.update(s => {
            s -= 1
            jailCurrent = s
            return s
          })
        }
        if(e.deltaY > 0){
          if(params.jail.step) params.jail.step.update(s => {
            s += 1
            jailCurrent = s
            return s
          })
        }
      }else{
        quitNow()
      }
    }
  }
  if(params.jail && params.jail.startJailed && !currentlyJailed){
    currentlyJailed = true
    document.body.style.overflow = "hidden";
    window.scrollTo(0, window.scrollY + position.y);
    window.addEventListener('wheel', wheelJail);
  }
  const checkVisibility = (e) => {
    let position = node.getBoundingClientRect()
    let innerH = position.height
    let jailNext = 0
    if(params.start == 'middle') innerH = position.height / 2
    if(params.start == 'start') innerH = 0
    let breakPoint = position.y + innerH - window.innerHeight
    if(params.jail && !currentlyJailed && position.y < 0 && jailCurrent < params.jail.steps - 1){
      currentlyJailed = true
      document.body.style.overflow = "hidden";
      scrollBack = window.scrollY + position.y
      window.scrollTo(0, scrollBack);
      window.addEventListener('wheel', wheelJail);
      return;
    }
    if(status === false && breakPoint < 0 && breakStop == false){
      status = true;
      if(params.cb) params.cb(status, node);
    }else{
      if(params.stop == 'end') breakStop = (position.y + innerH) < 0
      if(status === true && (breakPoint > 0 || breakStop == true)){
        status = false;
        if(params.cb) params.cb(status, node);
      }
    }
  }
  checkVisibility()
  window.addEventListener('scroll', checkVisibility);

  return {destroy(){
    window.removeEventListener('scroll', checkVisibility);
    window.removeEventListener('wheel', wheelJail);
  }};
}
