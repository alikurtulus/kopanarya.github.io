 console.log('Connected')
 let scene, camera, renderer, startGeo, stars, selectedIcon,urlIcon, learnMoreLink
 const typeWriter = document.getElementById('type-writer')
 const dataText = typeWriter.getAttribute('data-text')
 const mainNavLinks = document.querySelectorAll('nav div.buttons a')
 const hamburger = document.querySelector('.navbar-burger')
 const menu = document.querySelector('#'+hamburger.dataset.target)
 const bestHero = document.querySelector('.hero')
 const allLink = document.querySelector('.link-projects-container .link-projects:nth-child(1)')
 const gamingLink = document.querySelector('.link-projects-container .link-projects:nth-child(2)')
 const fullStackLink = document.querySelector('.link-projects-container .link-projects:nth-child(3)')
 const otherLink = document.querySelector('.link-projects-container .link-projects:nth-child(4)')
 const skillsContainer = document.querySelector('.skills-container')
 const animationBar = document.querySelector('.animation')
 const projectsContainer = document.getElementById('projects-container')
 let selectedCategory = []
 const projectChunks=[
    { link:"https://alikurtulush.dev/SEI-Pacman/",
      github:"https://github.com/kopanarya/SEI-Pacman",
      category:"gaming",
      imgUrl:"images/pacman/pacman-screen.png",
      projectTitle:"Pacman",
      projectImagesArr:["/pacman/pacman2.PNG","/pacman/pacman3.PNG"]
    },
    { link:"https://alikurtulush.dev/Project-2",
      github:"https://github.com/kopanarya/Project-2",
      category:"other",
      imgUrl:"images/londondaily/londondaily-screen.png",
      projectTitle:"London Daily",
      projectImagesArr:["/londondaily/londondaily2.png","/londondaily/londondaily3.png"]
    },
    { link:"https://gaeventup.herokuapp.com/#/",
      github:"https://github.com/kopanarya/eventsUp",
      category:"fullStack",
      imgUrl:"images/eventup/eventup-screen.png",
      projectTitle:"EventUp",
      projectImagesArr:["/eventup/eventup2.png","/eventup/eventup3.png","/eventup/eventup4.png"]
    },
    { link:"https://travelonar.herokuapp.com/#/",
      github:"https://github.com/kopanarya/Travelonar",
      category:"fullStack",
      imgUrl:"images/travelonar/travelonar-screen.png",
      projectTitle:"Travelonar",
      projectImagesArr:["/travelonar/travelonar2.png","/travelonar/travelonar3.png","/travelonar/travelonar4.png","/travelonar/travelonar5.png","/travelonar/travelonar6.png","/travelonar/travelonar7.png"]
    }]

let count = 0
const dataTextLength = dataText.length
const skillsIcon = ["api-icon.png","bootstrap-logo.png","css3-icon.png","github-icon.png","html-5.png","sass-icon.png","npm-icon.png","js-icon.png","npm-icon.png","python-icon.png","react-icon.png","webpack-icon.png","yarnpkg-icon.png","nodejs-icon.png","mongodb-icon.png"]
const init = () => {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000)
camera.position.z = 1;
camera.rotation.x = Math.PI/2
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
bestHero.appendChild(renderer.domElement);

// Create skills icon
const createSkills = () => {
  for(let i=0;i<skillsIcon.length;i++){
    let skillContainer = document.createElement('div')
    let skillIcon = document.createElement('img')
    skillContainer.className="column is-one-third-mobile is-one-quarter-desktop"
    skillIcon.className="icon"
  
    skillIcon.setAttribute('src','images/skills/'+skillsIcon[i])
    skillContainer.appendChild(skillIcon)
    skillsContainer.appendChild(skillContainer)
  }

}
createSkills()
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
urlIcon = "images/skills/" + selectedIcon
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
// We use this func to auto type text.
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
// When we click a navlink it goes to selected section which is clicked.
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
//We categorize our projects with function
const makeNewCategoryArr = (category, arr) =>{
  for(let i=0;i<projectChunks.length;i++){
      if(category === projectChunks[i]["category"]){
        arr.push(projectChunks[i])
      }
  }
  return arr
}
// We change fontColor of selectedLink
const changeFontColor= (selectedOne,otherSecond,otherThird,otherFourth) =>{
  selectedOne.style.cssText="color:firebrick;"
  otherSecond.style.cssText="color:white;"
  otherThird.style.cssText="color:white;"
  otherFourth.style.cssText="color:white;"
}
const createProjectsView = (selectedArr) => {
  for(let i=0;i<selectedArr.length;i++){
    let mainDiv = document.createElement('div')
    let textContainer = document.createElement('div')
    let projectImg = document.createElement('img')
    learnMoreLink = document.createElement('a')
    let projectName = document.createElement('p')
    textContainer.className='text-container-project overlayTop'
    textContainer.style.cssText="transition: all .3s ease;color:firebrick; position:absolute;opacity:0;font-weight:800;"
    projectName.className="project-name"
    projectName.textContent=selectedArr[i]['projectTitle']
    projectName.style.cssText=" font-size:1.6rem; color:firebrick;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;position:absolute;"
    learnMoreLink.className="learn-more-link"
    learnMoreLink.style.cssText="font-size:1.2rem;color:firebrick;border-radius:8px;border:1px solid firebrick;margin: auto;padding:10px;text-align:center;top:70%;left:50%;transform:translate(-50%,-70%);position:absolute;"
    learnMoreLink.textContent="Learn more"
    mainDiv.className="column is-full-mobile is-one-third-desktop project-div"
    mainDiv.style.cssText="width:380px;height:370px;margin:1rem 1rem;display:inline-block;position:relative;"
    projectImg.setAttribute('src',selectedArr[i]['imgUrl'])
    projectImg.className="project-img"
    projectImg.style.cssText="width:380px;height:370px;display:block; "
    textContainer.appendChild(projectName)
    textContainer.appendChild(learnMoreLink)
    mainDiv.appendChild(projectImg)
    mainDiv.appendChild(textContainer)
    projectsContainer.appendChild(mainDiv)
  }
}

createProjectsView(projectChunks)

// Choose any of these as the category of projects
allLink.addEventListener('click', () => {
  animationBar.style.cssText="width:80px;left:0;"
  changeFontColor(allLink,gamingLink,fullStackLink,otherLink)
  projectsContainer.innerHTML=""
  createProjectsView(projectChunks)
})
gamingLink.addEventListener('click', () => {
  animationBar.style.cssText="width:80px;left:80px;"
  changeFontColor(gamingLink,allLink,fullStackLink,otherLink)
  selectedCategory = []
  projectsContainer.innerHTML=""
  let gamingArr = makeNewCategoryArr('gaming', selectedCategory)
  createProjectsView(gamingArr)
})
fullStackLink.addEventListener('click', () => {
  animationBar.style.cssText="width:100px;left:160px;"
  changeFontColor(fullStackLink,allLink,gamingLink,otherLink)
  selectedCategory = []
  projectsContainer.innerHTML=""
  let fullStackArr = makeNewCategoryArr('fullStack', selectedCategory)
  createProjectsView(fullStackArr)
})
otherLink.addEventListener('click', () => {
  animationBar.style.cssText="width:80px;left:260px;"
  changeFontColor(otherLink,allLink,gamingLink,fullStackLink)
  selectedCategory = []
  projectsContainer.innerHTML=""
  let otherArr = makeNewCategoryArr('other', selectedCategory)
  createProjectsView(otherArr)

})
learnMoreLink.addEventListener('click', () => {

})

