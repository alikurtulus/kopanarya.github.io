document.addEventListener('DOMContentLoaded', () => {

  console.log('Connected')
  const typeWriter = document.getElementById('type-writer')
  const dataText = typeWriter.getAttribute('data-text')
  // const aboutLink = document.querySelector('.about-link')
  // const projectLink = document.querySelector('.project-link')
  // const contactLink= document.querySelector('.contact-link')
  let mainNavLinks = document.querySelector('nav div.buttons a')
  const mainSections = document.querySelectorAll('main section')
  let lastId
  let cur = []

  let count = 0
  const dataTextLength = dataText.length

  function setText(){
    setTimeout(() => {
      typeWriter.textContent +=dataText.charAt(count)
      count++
      if(count <=dataTextLength){
        setText()
      }
    },100)

  }

  window.addEventListener('scroll', event => {
    const fromTop = window.scrollY
    mainNavLinks.forEach(link => {
      const section = document.querySelector(link.hash)

      if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add('current')
      } else {
        link.classList.remove('current')
      }
    })
  })

  // function smoothScroll(target, duration){
  //   target = document.querySelector(target)
  //   let targetPosition = target.getBoundingClientRect().top
  //   let startPosition = window.pageYOffset
  //   let distance = targetPosition - startPosition
  //   let startTime = null
  //   console.log(startPosition)
  //   console.log(target)
  //   console.log(targetPosition)
  //   function animation(currentTime){
  //     if(startTime === null) startTime = currentTime
  //     const timeElapsed = currentTime - startTime
  //     const run = ease(timeElapsed , startPosition, distance, duration)
  //     window.scrollTo(0, run)
  //     if(timeElapsed < duration) requestAnimationFrame(animation)
  //   }
  //   function ease(t, b , c , d){
  //     t /= d / 2
  //     if(t < 1) return c / 2 * t * t + b
  //     t--
  //     return - c / 2 * (t * (t - 2) - 1) + b
  //   }
  //   requestAnimationFrame(animation)
  // }

  setText()

  // aboutLink.addEventListener('click', function(e){
  //   e.preventDefault()
  //   // smoothScroll('.about-section', 1000)
  //   scrollMove('about-section')
  //
  //
  //
  // })
  // projectLink.addEventListener('click', function(e){
  //   e.preventDefault()
  //   scrollMove('project-section')
  //   // smoothScroll('.project-section', 1000)
  // })
  // contactLink.addEventListener('click', function(e){
  //   e.preventDefault()
  //   // smoothScroll('.contact-section', 1000)
  //   scrollMove('contact-section')
  // })












})
