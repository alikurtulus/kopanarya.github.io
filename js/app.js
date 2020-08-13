 console.log('Connected')
 AOS.init({
   offset:400,
   duration:1200
 });
 window.addEventListener('load', AOS.refresh)
 let scene, camera, renderer, startGeo, stars, selectedIcon,urlIcon, learnMoreLink,chosenProject,leftArrow,rightArrow, slides,slider,usedTechnologies 
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
 let index = 0
let count = 0
const dataTextLength = dataText.length
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
  selectedOne.style.cssText="color:darkslategray;"
  otherSecond.style.cssText="color:darkslategray;"
  otherThird.style.cssText="color:darkslategray;"
  otherFourth.style.cssText="color:darkslategray;"
}
const createProjectsView = (selectedArr) => {
  // We get category's projects and make a section about it.
  for(let i=0;i<selectedArr.length;i++){
    let mainDiv = document.createElement('div')
    let textContainer = document.createElement('div')
    let projectImg = document.createElement('img')
    learnMoreLink = document.createElement('button')
    let projectName = document.createElement('p')
    textContainer.className='text-container-project overlayTop'
    textContainer.style.cssText="transition: all .2s ease;color:firebrick; position:absolute;opacity:0;font-weight:800;"
    projectName.className="project-name"
    projectName.textContent=selectedArr[i]['projectTitle']
    projectName.style.cssText=" font-size:1.4rem; color:firebrick;text-align:center;"
    learnMoreLink.className="learn-more-link "
    learnMoreLink.id=selectedArr[i]['projectTitle']
    learnMoreLink.style.cssText="font-size:1.2rem;color:firebrick;border-radius:8px;border:1px solid firebrick;padding:10px;text-align:center;margin-top:10px;outline:none;background-color:Transparent;cursor:pointer;"
    learnMoreLink.textContent="Learn more"
    mainDiv.className="column is-full-mobile is-one-third-desktop project-div"
    mainDiv.style.cssText="width:350px;height:380px;margin:1rem 1rem;display:inline-block;position:relative;"
    projectImg.setAttribute('src',selectedArr[i]['imgUrl'])
    projectImg.className="project-img"
    projectImg.style.cssText="width:500px;height:400px;object-fit:cover;object-position:50% 50%; "
    learnMoreLink.addEventListener('click', (e) => {
      selectedProject(e.target.id)
    })
    textContainer.appendChild(projectName)
    textContainer.appendChild(learnMoreLink)
    mainDiv.appendChild(projectImg)
    mainDiv.appendChild(textContainer)
    mainDiv.setAttribute('data-aos','fade')
    projectsContainer.appendChild(mainDiv)
  }
}
const selectedProject = (id) => {
  for(let i=0;i<projectChunks.length;i++){
    if(projectChunks[i]['projectTitle'] === id){
      chosenProject = projectChunks[i]
    }
  }
  slider = createCarousel(chosenProject['projectImagesArr'])
  usedTechnologies = createUsedTech(chosenProject['usedTecnologies'])
  createModal(chosenProject)
}
createProjectsView(projectChunks)
const createUsedTech = (usedTechArr) => {
  const usedTechContainer = document.createElement('div')
  usedTechContainer.className="columns is-mobile "
  for(let i = 0; i<usedTechArr.length;i++){
    const techItem = document.createElement('div')
    const usedTechItemImg = document.createElement('img')
    usedTechItemImg.setAttribute('src','images/skills/'+usedTechArr[i])
    techItem.className="column  project-used-icon   "

    techItem.appendChild(usedTechItemImg)
    usedTechContainer.appendChild(techItem)
  }
  return usedTechContainer
}
const createCarousel = (sliderImages)=> {
  const sliderContainer = document.createElement('div')
  const sliderItems = document.createElement('div')
  leftArrow = document.createElement('div')
  rightArrow = document.createElement('div')
  index = 0
  sliderContainer.className="slider"
  sliderItems.className="slider-items"
  leftArrow.className="left-slide"
  rightArrow.className="right-slide"
  leftArrow.style.cssText="background-image:url(images/left-icon.png);background-repeat:no repeat;background-size:100% 100%;background-position:center center;"
  rightArrow.style.cssText="background-image:url(images/right-icon.png);background-repeat:no repeat;background-size:100% 100%;background-position:center center;"

  for(let i=0;i<sliderImages.length;i++){
    const item = document.createElement("div")
    const img = document.createElement('img')
    item.className="image item"
    let imgUrl = chosenProject["imgFolder"]+'/'+sliderImages[i]
    img.style.cssText="width: 100%;height:360px; object-fit:cover;object-position:50% 50%;"
    img.setAttribute('src',"images/"+imgUrl)
    item.appendChild(img)
    sliderItems.appendChild(item)
  }
  sliderContainer.appendChild(sliderItems)
  sliderContainer.appendChild(leftArrow)
  sliderContainer.appendChild(rightArrow)
  slides = sliderItems.children
  slides[0].classList.add('active')
  rightArrow.onclick = function(){
    next('next')
  }
  leftArrow.onclick = function(){
    next('prev')
  }
  //Movement for carousel.
  const next = (direction) => {
    if(direction === "next"){
      index++
      if(index ===  sliderImages.length){
        index=0
      }
    }
    else{
      if(index == 0){
        index = sliderImages.length -1
      }
      else{
        index--
      }
    }
    for(let i=0;i<sliderImages.length;i++){
      slides[i].classList.remove('active')
    }
    slides[index].classList.add('active')
  }
  return sliderContainer
}
const createModal = (myProject) => {
// Modal's elements defines
const modalContainer = document.createElement('div')
const modalBackground = document.createElement('div')
const modalContent = document.createElement('div')
const btnClose = document.createElement('button')
const modalWrap = document.createElement('div')

//Gives className and attribute for the element of modal component.
modalWrap.className="section modal-wrap"
modalBackground.className="modal-background"
btnClose.className="modal-close is-large"
btnClose.setAttribute('aria-label', "close")
modalContent.className="modal-content"
modalContainer.className="modal"
modalContainer.id="page-modal"
modalContainer.appendChild(modalBackground)
modalContainer.appendChild(btnClose)
//Card Element Defines
const modalCard = document.createElement('div')
const modalImgContainer = document.createElement('div')
const imgContainer = document.createElement('div')
const btnViewCode = document.createElement('a')
const btnViewSite = document.createElement('a')
const cardContent = document.createElement('div')
const buttonsContainer= document.createElement('div')
const contentTitle = document.createElement('h3')
const miniContent = document.createElement('div')
const divider = document.createElement('br')
const techTitle = document.createElement('h4')
// Give classNames and attributes for the element of card component.
modalCard.className="card"
modalImgContainer.className="card-image"
modalImgContainer.style.cssText="border:none;"
modalImgContainer.appendChild(slider)
modalCard.appendChild(modalImgContainer)
cardContent.className="card-content"
contentTitle.className="title is-4 project-name"
techTitle.className="title is-6"
techTitle.textContent="Used Technologies"
miniContent.className="content modal-content-container"
contentTitle.textContent = myProject['projectTitle']
miniContent.textContent = myProject['description']
cardContent.appendChild(contentTitle)
cardContent.appendChild(miniContent)
cardContent.appendChild(techTitle)
cardContent.appendChild(usedTechnologies)
cardContent.appendChild(divider)
btnViewCode.className = "button is-danger is-outlined btn-view-code"
btnViewCode.textContent="View Code"
btnViewCode.setAttribute('href',myProject['github'])
btnViewCode.style.cssText="margin-left:20px; !important"
btnViewCode.setAttribute('target',"_blank")
btnViewSite.className="button is-link is-outlined btn-view-site"
btnViewSite.setAttribute('href',myProject['link'])
btnViewSite.setAttribute('target',"_blank")
btnViewSite.textContent="View Site"
buttonsContainer.className="btn-container"
buttonsContainer.appendChild(btnViewCode)
buttonsContainer.appendChild(btnViewSite)
cardContent.appendChild(buttonsContainer)
modalCard.appendChild(cardContent)
modalWrap.appendChild(modalCard)
modalContent.appendChild(modalWrap)
modalContainer.appendChild(modalContent)
projectsContainer.appendChild(modalContainer)
modalContainer.style.display="block"
// When We want to close modal component
   btnClose.onclick = function(){
      modalContainer.style.display="none"
  }
// When We click  the out of modal component
  window.onclick = function(event) {
    if(event.target.className == 'modal-background'){
      modalContainer.style.display="none"
    }
 }
}
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
