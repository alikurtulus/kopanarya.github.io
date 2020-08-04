 console.log('Connected')
 let scene, camera, renderer, startGeo, stars, selectedIcon,urlIcon
 const typeWriter = document.getElementById('type-writer')
 const dataText = typeWriter.getAttribute('data-text')
 const mainNavLinks = document.querySelectorAll('nav div.buttons a')
 const hamburger = document.querySelector('.navbar-burger')
 const menu = document.querySelector('#'+hamburger.dataset.target)
 const bestHero = document.querySelector('.hero')
 let count = 0
 const dataTextLength = dataText.length
 const skillsIcon = [
       "api-icon",
       "bootstrap-logo.png",
       "css3-icon.png",
       "github-icon.png",
       "html-5.png",
       "sass-icon.png",
       "npm-icon.png",
       "js-icon.png",
       "npm-icon.png",
       "python-icon.png",
       "react-icon.png",
       "webpack-icon.png",
       "yarnpkg-icon.png",
       "nodejs-icon.png",
       "mongodb-icon.png"
  ]
 const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000)
  camera.position.z = 1;
  camera.rotation.x = Math.PI/2
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);
  bestHero.appendChild(renderer.domElement);

  startGeo = new THREE.Geometry()

  for(let i=0; i< 6000; i++){
     let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    )
    star.velocity= 0
    star.acceleration = 0.02
    startGeo.vertices.push(star)
  }
 
  selectedIcon = skillsIcon[Math.floor(Math.random() * skillsIcon.length)]
  urlIcon = "images/" + selectedIcon
  let sprite = new THREE.TextureLoader().load(urlIcon)
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size:1.2,
    map:sprite
  })
  stars = new THREE.Points(startGeo, starMaterial)
  scene.add(stars)
  animate()
 }

 const animate = () => {
  startGeo.vertices.forEach(p=>{
    p.velocity += p.acceleration
    p.y -= p.velocity
    if(p.y < -200){
      p.y = 200
      p.velocity = 0
    }
  })
   startGeo.verticesNeedUpdate = true
   stars.rotation.y += 0.02
   renderer.render(scene, camera)
   requestAnimationFrame(animate)
 }
 init()
 window.addEventListener('resize', () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth,window.innerHeight);
 })
  const setText = () => {
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





