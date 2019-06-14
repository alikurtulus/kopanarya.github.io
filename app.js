document.addEventListener('DOMContentLoaded', () => {

  console.log('Connected')
  const typeWriter = document.getElementById('type-writer')
  const dataText = typeWriter.getAttribute('data-text')
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











})
