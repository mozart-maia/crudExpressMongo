var update = document.getElementById('update')
var del = document.getElementById('delete')
var dname = ""

function inputChange () {
    dname = document.getElementById('delinput').value
}


update.addEventListener('click', function (){
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Darth Vader',
          'quote': 'I find your lack of faith disturbing.'
        })
      })
      .then(res => {
          if (res.ok) return res.json()
      })
      .then(data => {
          console.log(data)
          window.location.reload(true)
      })
})



del.addEventListener('click', function(){
    fetch('quotes', {  //procura por algum elemento com id ou classe delvalue
        method: 'delete', //aqui começa a criar uma requisição ocm o metodo
        headers: {'Content-Type': 'application/json'}, //o cabeçalho da requisição
        body: JSON.stringify({ //colocar o que pegar do body em formato json para ser incluído na coleção
            'name': dname//tudo que tiver name correspondendo a Darth Vader ele pega
        })
    })
    .then(res =>{  
        if (res.ok) return res.json() //responde com a requisição criada acima se for encontrado algo que corresponda no body
    })
    .then(data => { 
        console.log(data) //imprime o retorno da função anterior, protanto o que foi deletado
        window.location.reload() //da refresh na pagina
    })
})