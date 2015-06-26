fatec-akademie
==============

Projeto para a materia de IHC do 1. semestre de 2015.

Prof. Shigeo

## Sobre o projeto

O projeto Akademie, tambem denominado iFit e um aplicativo focado em tecnologias moveis e web. Seu objetivo e prover acompanhamento aos exercicios fisicos, onde o usuario tera seu progresso durante seus treinos a medida que completa seus objetivos.

O app foca nas atividades aerobicas, facilitando ainda mais o usuario que quer melhorar seu fisico durante a academia.

## Sobre o app

As tecnologias principais utilizadas neste projeto sao as seguintes:

* Node.js + Express Framework
* MongoDB
* Ionic Framework + Apache Cordova
* Angular

## Requisitos do ambiente

Para desenvolver, e necessario um ambiente unix com nodejs. Na versao padrao foi utilizado ubuntu.

### Para usuarios de Windows

Nao foi testado o desenvolvimento direto no SO Windows. O ambiente ja esta configurado para ambientes linux.

Para subir um ambiente Linux numa maquina windows, recomendo utilizar o Vagrant:

1. Instale o Vagrant e o VirtualBox
2. Instale os plugins: vagrant-hostsupdater e vagrant-timezone
3. [Baixe os dois arquivos neste Gist](https://gist.github.com/ninetails/cc854e1a3f5729027ba2)
4. Entre na pasta onde estao os dois arquivos e suba a maquina utilizando o comando `vagrant up`.
5. Caso tenha instalado o ambiente que deixei no gist, ele ira abrir uma instancia do VirtualBox com o Ubuntu em modo GUI. Para rodar o modo GUI (xfce4), apos a maquina ter subido, logue no terminal (user vagrant, senha vagrant) e mande o comando `startxfce4&`.

### Instalacao do repositorio

Clone este repositorio em seu ambiente node.js

Apos clonar, entre na pasta e rode o comando `npm install`. Ele ira instalar todas as dependencias do projeto. Ainda e necessario alguns pacotes npm que sao instalados globalmente, a relacao esta no arquivo bash do gist do Vagrantfile.

### Rodando o ambiente (npm run-script)

Caso estiver desenvolvendo na parte do servidor, que esta dentro da pasta `server`, recomendo utilizar o nodemon.

Para isto, utilize o shortcut:

`npm run-script nodemon`

Caso estiver desenvolvendo o app, rode:

`npm run-script ionic-serve`

### Deploy

Para rodar o servidor fora do desenvolvimento, rode:

`npm run-script serve`

Ja para fazer deploy do app e necessario ler as instrucoes no site [ionicframework.com](http://ionicframework.com)
