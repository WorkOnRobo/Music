export default {
  beforeMount(el, binding) {
    let iconclass = `fa fa-${binding.value} text-xl`

    if (binding.arg === 'holl') {
        iconclass = binding.value
    }

    if ( binding.modifiers.right && binding.modifiers.yellow)
    {
        iconclass += ` float-right text-yellow-400`
    }

 

    el.innerHTML += `<i class="${iconclass}"></i>`
  }
}

