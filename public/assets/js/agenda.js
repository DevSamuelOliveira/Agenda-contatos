function deletar(event){
  $.ajax({
    type: 'delete',
    url: '/agenda',
    data: `id=${event.target.id}`,
    success: () => {
      fetch("/agendaTable").then(async (data) => {
        $('#contain-table').html(await data.text())
      })
    }
  })
}

function editar(event){

  edit = event.target

  let inputs = document.getElementById(edit.id + 'line')
  let form = document.getElementById('att_contact')

  form[0].value = inputs.cells[0].innerText
  form[1].value = inputs.cells[1].innerText
  form[2].value = inputs.cells[2].innerText
  if(inputs.cells[3].innerText != "Não registrado"){
    form[3].value = inputs.cells[3].innerText
  }
  form[4].value = inputs.cells[4].innerText

}

document.getElementById('att_contact').addEventListener('submit', (event) => {
  event.preventDefault()

  let e = event.target

  $.ajax({
    type: 'PUT',
    url: '/agenda',
    data: `id=${edit.id}&type_contact=${e[0].value}&name_contact=${e[1].value}&number_cel=${e[2].value}&number_tel=${e[3].value}&description=${e[4].value}`,
    success: () => {
      fetch("/agendaTable").then(async (data) => {
        $('#contain-table').html(await data.text())
      })
    }
  })
})

document.getElementById('new_contact').addEventListener('submit', (event) => {
  event.preventDefault()

  let e = event.target

  $.ajax({
    type: 'POST',
    url: '/agenda',
    data: `type_contact=${e[0].value}&name_contact=${e[1].value}&number_cel=${e[2].value}&number_tel=${e[3].value}&description=${e[4].value}`,
    success: () => {
      fetch("/agendaTable").then(async (data) => {
        $('#contain-table').html(await data.text())
      })
    }
  })
})

document.getElementById('number_cel').addEventListener('keypress', (event) => {
  let input = event.target

  switch(input.value.length){
    case 0:
      input.value = "("
      break
    case 3:
      input.value += ") "
      break
    case 10:
      input.value += "-"
  }
})

document.getElementById('number_tel').addEventListener('keypress', (event) => {
  let input = event.target

  switch(input.value.length){
    case 0:
      input.value = "("
      break
    case 3:
      input.value += ") "
      break
    case 9:
      input.value += "-"
  }
})