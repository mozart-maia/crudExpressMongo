var update = document.getElementById('update')
var del = document.getElementById('delete')
var dname = ""

var upname = ""
var updatename = ""
var updatequote = ""

function inputChange () {
    dname = document.getElementById('delinput').value
}

function inputChangeUpName () {
    updatename = document.getElementById('upnameinput').value
}

function inputChangeUpQuote () {
    updatequote = document.getElementById('upquoteinput').value
}

function displayRadioValue() { 
    var rb = document.getElementsByName('radiobutton')
      
    for(i = 0; i < rb.length; i++) {           
        if(rb[i].type=="radio") {           
            if(rb[i].checked){                 
               upname = rb[i].value
               let staticinput = document.getElementById("staticName")
               staticinput.value = upname
               let anotherinput = document.getElementById("delinput")
               anotherinput.value = upname
               inputChange()
            }
        } 
    }     
}

update.addEventListener('click', function (){
    fetch('quotes', {
        method: 'put',  //constroi uma requisição put para ser enviado ao express
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': updatename,
          'quote': updatequote,
          'update': upname
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
    fetch('quotes', {  //procura por algum elemento com id ou classe quotes
        method: 'delete', //aqui começa a criar uma requisição com o metodo
        headers: {'Content-Type': 'application/json'}, //o cabeçalho da requisição
        body: JSON.stringify({ //colocar o que pegar do body em formato json para ser incluído na coleção
            'name': dname  //tudo que tiver name correspondendo a dname ele pega
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