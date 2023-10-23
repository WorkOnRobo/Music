export default {
    beforeMount(el, binding) {
      let iconclass = `fa fa-${binding.value.icon2} text-red-400 text-xl`
  
     
  
      if ( binding.value.right)
      {
          iconclass += ` float-right`
      }
  
   
  
      el.innerHTML += `<i class="${iconclass}"></i>`
    }
  }
  
  