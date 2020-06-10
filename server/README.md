<h1> Atenção </h1>
O servidor irá ser hospedado no site do <a href="https://www.heroku.com/">Heroku</a>, logo este diretório só será necessário para o caso de precisar rodar o servidor localmente.

Para o caso de precisar executar o servidor localmente, siga os passos a seguir:

1. Intale as dependências no servidor (neste diretório) e no diretório config utilizando o comando ` npm install ` em cada diretório.
2. Entre na pasta na pasta config, verifique seu endereço IP (no Linux pode verificar o inet usando o comando ` ifconfig ` e no Windows pode verificar o endereço ipv4 usando o comando ` ipconfig `) e mude o valor no arquivo ipaddress para o seu endereço IP. A seguir instale as dependências na pasta utilizando o comando ` npm install `.
3. Os passos a seguir serão executados dentro deste diretório:
   1. No arquivo server.ts, troque, na 7ª linha, ` const port = process.env.PORT || 4000 ` por ` const port = 4000 `
   2. No arquivo pointsController.ts (dentro da pasta controllers), adicione a importação ` import IPAdress from "../../../config" ` no início do arquivo. No método show (aproximadamente na linha 56) e no método index (aproximadamente linha 76) troque ` let address = "https://ecoleta1.herokuapp.com" ` por ` let address = new IPAdress().address() `
   3. No arquivo itemsController.ts mude ` let address = "https://ecoleta1.herokuapp.com" ` por ` let address = new IPAdress().address() ` (aproximadamente na linha 9)
4. Os passos a seguir serão executados dentro do diretório mobile:
   1. Importe IPAdress digitando ` import IPAddress from "ipaddress" ` no início do arquivo
   2. No arquivo Api.ts, dentro da pasta services dentro de src, mude de ` let address = "https://ecoleta1.herokuapp.com" ` e ` baseURL: address ` para ` let address = new IPAddress().address() ` e ```` baseURL: `http://${address}:4000` ````
5. Os passos a seguir serão executados dentro do diretório web:
   1. No arquivo api.ts, dentro da pasta services dentro de src, mude de ` baseURL: "https://ecoleta1.herokuapp.com" ` para ` baseURL: "http://localhost:4000" `

2. Para rodar o servidor:
   1. Caso seja a primeira vez que roda o servidor, crie a base de dados usando ` npm run knex:migrate ` e crie um alguns itens no banco de dados usando ` npm run knex:seed `.
   2. Rode o servidor utilizando o comando ` npm run test `
