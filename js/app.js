 console.log('Connected')
 const scene = new THREE.Scene();

 const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
 camera.position.z = 5;
 
 const renderer = new THREE.WebGLRenderer({antialias: true});
 renderer.setClearColor("#e5e5e5");
 renderer.setSize(window.innerWidth,window.innerHeight);

 document.body.appendChild(renderer.domElement);

 window.addEventListener('resize', () => {
     renderer.setSize(window.innerWidth,window.innerHeight);
     camera.aspect = window.innerWidth / window.innerHeight;

     camera.updateProjectionMatrix();
 })

  const typeWriter = document.getElementById('type-writer')
  const dataText = typeWriter.getAttribute('data-text')
  const mainNavLinks = document.querySelectorAll('nav div.buttons a')
  const hamburger = document.querySelector('.navbar-burger')
  const menu = document.querySelector('#'+hamburger.dataset.target)


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
  setText()

  window.addEventListener('scroll', function () {
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
  hamburger.addEventListener('click', function(){
    hamburger.classList.toggle('is-active')
    menu.classList.toggle('is-active')
    menu.style.color = 'red'
  })





