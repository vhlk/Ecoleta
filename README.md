<h1 align="center">
  <br>
  <img src="/images/logo.png" />
</h1>
<h5 align="center">
    Uma aplicação para cadastro de pontos de coleta de produtos recicláveis construído em cima de <a href="https://reactjs.org/">ReactJS</a> para versão Web, <a href="https://reactnative.dev/">React Native</a> para versão mobile e <a href="https://expressjs.com/">Express</a> para servidor.
</h5>

<p align="center">
  <a href="#features-principais">Features Principais</a> •
  <a href="#como-usar">Como usar</a> •
  <a href="#download">Download</a> •
  <a href="#licença">Licença</a>
</p>

## Features Principais

Ecoleta é capaz de realizar os cadastros dos pontos de coleta (atualmente feito através do navegador):

<img src ="/images/pagina_inicial.png" alt="Página inicial cadastro do Ponto de Coleta"/> •
<img src ="/images/cadastro_1.png" alt="Cadastro Ponto de Coleta"/> •
<img src ="/images/cadastro_2.png" alt="Cadastro Ponto de Coleta"/>

E capaz de mostrar ao usuário final os pontos de coleta disponíveis na sua região:

<img src ="/images/mobile_1.jpg" alt="Selecionar Região Ponto de Coleta" width="360" height="740"/> •
<img src ="/images/mobile_2.jpg" alt="Visualizar Pontos de Coleta Próximos" width="360" height="740"/> •
<img src ="/images/mobile_3.jpg" alt="Visualizar Informações do Ponto de Coleta" width="360" height="740"/>


## Como Usar

Ecoleta está à procura de um servidor na internet para hospedar, enquanto isso você poderá testá-lo baixando os arquivos deste repositório e instalando manualmente suas dependências:

1. Caso não possua, instale o <a href="https://nodejs.org/en/">NodeJS</a>.
2. Abra a pasta do projeto.
3. Os passos a seguir utilizam o terminal ou afins:
   1. Entre na pasta na pasta config, verifique seu endereço IP (no Linux pode verificar o inet usando o comando ` ifconfig ` e no Windows pode verificar o endereço ipv4 usando o comando ` ipconfig `) e mude o valor no arquivo ipaddress para o seu endereço IP. A seguir instale as dependências na pasta utilizando o comando ` npm install `.
   2. Para rodar o servidor:
      1. Entre na pasta do servidor e instale as dependências usando ` npm install `.
      2. Caso seja a primeira vez que roda o servidor, crie a base de dados usando ` npm run knex:migrate ` e crie um alguns itens no banco de dados usando ` npm run knex:seed `.
      3. Rode o servidor utilizando o comando ` npm run test `
   3. Para rodar a versão web:
      1. Entre na pasta web e instale as dependências usando ` npm install `.
      2. Rode utilizando o comando ` npm start `.
      3. Deverá estar funcionando no endereço informado (provavelmente em http://localhost:3000).
   4. Para rodar a versão mobile:
      1. Baixe na loja (<a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www">Google Play</a> ou <a href="https://apps.apple.com/app/apple-store/id982107779">App Store</a>) o aplicativo Expo (links anteriormente) caso não o tenha instalado.
      2. Entre na pasta mobile e instale as dependências usando ` npm install `.
      3. Execute utilizando o comando ` npm start `.
      4. Leia o código QR mostrado com o Expo no celular, espere carregar e pronto!
      * **Atenção: Será necessário ativar a localização no celular apenas para que o mapa possa ser mostrado com os pontos de coleta próximos.**


## Download

Como dito acima, downloads apenas através do Github.

## Licença
GNU
