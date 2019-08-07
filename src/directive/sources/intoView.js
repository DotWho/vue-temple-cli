const intoView = target => {
  return () => {
    setTimeout(() => {
      target.scrollIntoView(true)
    }, 300)
  }
}

export default {
  bind(el) {
    const intoViewed = intoView(el)
    el.addEventListener('touchend', intoViewed)
    el._intoView = intoViewed
  },
  unbind(el) {
    el.removeEventListener('touchend', el._intoView)
  }
}
