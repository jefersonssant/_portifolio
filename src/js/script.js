// Dados
import projetos from "./projDB.js";

let header = document.querySelector('.header');
let modal = document.querySelector('dialog');
let toggleTema = document.querySelector('#theme-toggle');
let temaEscuro = { "--cor-bg": "#0A192F", "--cor-fonte": "#fff", "--cor-bg-hover": "#1E90FF" };
let temaClaro = { "--cor-bg": "#fff", "--cor-fonte": "#0A192F", "--cor-bg-hover": "#0A192F" };
let fecharModalBtn = document.querySelector('.dialogHeader div');
let btns = document.querySelectorAll('.button-contato');
let habilidades = document.querySelectorAll('.habilidade-icone');
let secaoProj = document.querySelector('.projetos-area');
let navResponsivo = document.querySelector('.header nav');
let btnAbrir = document.querySelector('#btn-abrir');
let menuAberto = false;


// Eventos
window.addEventListener('load', () => {
  let h1 = document.getElementById('titulo-animado');
  let p = document.getElementById('paragrafo-animado');

  let texto1 = "Olá, eu sou o ".split('');
  let nome = "Jeferson Santos :)".split('');
  let textoStrong = "Desenvolvedor Web Front-End - React.js".split('');
  let textoResto = " e construo soluções web modernas e otimizadas para uma ótima experiência do usuário.".split('');
  animaDigitacao(texto1, h1, () => {
    let br = document.createElement('br');
    let spanNome = document.createElement('span');
    h1.appendChild(br);
    h1.appendChild(spanNome);
    animaDigitacao(nome, spanNome, () => {
      let strong = document.createElement('strong');
      p.appendChild(strong);
      animaDigitacao(textoStrong, strong, () => {
        animaDigitacao(textoResto, p, () => {
          mostrarBotoes()
        });
      })
    });
  });
});

window.addEventListener('scroll', () => {
  headerEfect();
  menuEffect();
});
window.addEventListener('resize', ()=>{
  menuEffect();
});
window.addEventListener('scroll', () => {
  animaArrasta(habilidades, 1100)
});
window.addEventListener('scroll', () => {
  let projs = secaoProj.querySelectorAll('.projeto-item');
  animaArrasta(projs, 2000)
});
toggleTema.addEventListener('change', mudarTema);
fecharModalBtn.addEventListener('click', fecharModal);
btnAbrir.addEventListener('click', aoAbrirEFecharMenu)
// Funções
function headerEfect() {
  if (window.scrollY > 1) {
    header.classList.add('transHeader');
  } else {
    header.classList.remove('transHeader');
  }
}
function menuEffect() {
  const rootStyles = getComputedStyle(document.documentElement);
  const corBgAtual = rootStyles.getPropertyValue('--cor-bg');
  const corFonteAtual = rootStyles.getPropertyValue('--cor-fonte');

  const estaResponsivo = window.innerWidth <= 768;
  const fezScroll = window.scrollY > 1;

  if (estaResponsivo && menuAberto) {
    navResponsivo.style.backgroundColor = fezScroll ? temaEscuro['--cor-bg'] : corBgAtual;
    
    const linksMenu = navResponsivo.querySelectorAll('a');
    linksMenu.forEach(link => {
      link.style.color = fezScroll ? temaEscuro['--cor-fonte'] : corFonteAtual;
    });
  } else {
    navResponsivo.style.backgroundColor = '';
    const linksMenu = navResponsivo.querySelectorAll('a');
    linksMenu.forEach(link => {
      link.style.color = '';
    });
  }
}


function mudarTema() {
  let body = document.body;
  let root = document.documentElement;
  if (toggleTema.checked) {
    body.style.backgroundColor = '#0A192F';
    for (let estiloEscuro in temaEscuro) {
      root.style.setProperty(estiloEscuro, temaEscuro[estiloEscuro]);
    }
  } else {
    body.style.backgroundColor = '#fff';
    for (let estiloClaro in temaClaro) {
      root.style.setProperty(estiloClaro, temaClaro[estiloClaro]);
    }
  }
  menuEffect();
}
function preencheProj(item) {
  let projetoItem = document.createElement('div');
  projetoItem.classList.add('projeto-item');
  projetoItem.innerHTML = `<img src="${item.img}" alt=""><div class="projeto-item-info" data-id="${item.id}"><h2>Saiba mais</h2></div>`;
  secaoProj.append(projetoItem);
  projetoItem.querySelector('.projeto-item-info').addEventListener('click', abrirModal);
}

projetos.forEach((item) => {
  preencheProj(item)
})
function abrirModal(e) {
  let chave = e.target.closest('.projeto-item-info').getAttribute('data-id');
  let projetoSelecionado = projetos.find(projeto => projeto.id == chave);
  modal.querySelector('.dialogHeader h1').innerHTML = projetoSelecionado.titulo;
  modal.querySelector('.dialogMain .descricao').innerHTML = projetoSelecionado.descricao;
  modal.querySelector('.dialogMain img').src = projetoSelecionado.img;
  modal.querySelector('.dialogBtns #repo').href = projetoSelecionado.linkRepo;
  modal.querySelector('.dialogBtns #demo').href = projetoSelecionado.linkDemo;

  modal.style.opacity = 0;
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.showModal()
  }, 200)
}
function fecharModal() {
  modal.style.opacity = 1;
  setTimeout(() => {
    modal.style.opacity = 0;
    modal.style.display = 'none';
  }, 10);
  modal.close();
}
function animaDigitacao(arrayLetras, elementoPai, callback = null) {
  arrayLetras.forEach((letra, index) => {
    setTimeout(() => {
      let span = document.createElement('div');
      span.innerText = letra;
      span.classList.add('apresentacao-animada');
      elementoPai.appendChild(span);
      if (index === arrayLetras.length - 1 && callback) {
        callback();
      }
    }, index * 50);
  });
}
function mostrarBotoes() {
  btns.forEach((btn, index) => {
    btn.style.opacity = 0;
    btn.style.display = 'block';
    setTimeout(() => {
      btn.style.opacity = 1;
    }, index * 100);
  });
}
function animaArrasta(varArray, alturaTela) {
  if (window.scrollY > alturaTela) {
    varArray.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 200);
    });
  } else {
    varArray.forEach((item) => {
      item.classList.remove('show');
    })
}
}

function aoAbrirEFecharMenu() {
  if(!menuAberto) {
    btnAbrir.setAttribute('class', 'fa fa-times');
    navResponsivo.style.display = 'block';
    navResponsivo.classList.add('animaMenuResponsivoClasse');
    menuAberto = true;
    menuEffect();
  } else {
    btnAbrir.setAttribute('class', 'fa-solid fa-bars');
    navResponsivo.style.display = 'none';
    navResponsivo.classList.remove('animaMenuResponsivoClasse');
    menuAberto = false;
  }
}
