<h1 align="center"> Consulta de Casos de Covid-19</h1>
    
  Esta é uma aplicação web de exercício do Processo seletivo da vaga de estágio da empresa Kidopi, desenvolvida como objetivo de fornecer aos usuários informações atualizadas sobre os casos de Covid-19 em diferentes países e regiões. O sistema apresenta estatísticas detalhadas sobre casos confirmados e número de mortes.
  
  Utilizei a API disponibilizada pela empresa para fazer o exercício da busca. E criei um banco de dados (usando MySQL) para armazenar as informações de cada busca no sistema, onde este guarda a data de acesso, e o país procurado. 
  Na pŕopria aplicação (no footer/rodapé da página) é possível visualizar as informações da última busca, pois há a recuperação desses dados.
<br>  
<br>

![image](https://github.com/gabrielewanzeler/projeto-php-covid/assets/109773605/f0208d3d-4f3d-46f6-9849-3d570865d837)


<br>
<br>

<Strong><h2 align="center"> Funcionalidade Principal:</h2></Strong>

Consulta por País: Os usuários podem selecionar um país em um formulário (Brasil, Canadá ou Austrália) e visualizar os dados de Covid-19 relacionados a esse país.
Ainda é possível visualizar ao final da página um gráfico referente ao número de casos confirmados de COVID-19 de cada estado do país escolhido.
<br>
<br>

 <Strong><h2 align="center"> Demonstração:</h2></Strong>

Selecione um país no formulário para visualizar os casos de Covid-19 e suas estatísticas de número de óbitos e de casos confirmados.
<br>

![image](https://github.com/gabrielewanzeler/projeto-php-covid/assets/109773605/b86f3ca8-aa36-4586-832d-a4ded77e1875)



<br>
Visualize os dados e vá até o final da página.

<br>
<br>

![image](https://github.com/gabrielewanzeler/projeto-php-covid/assets/109773605/15ae320c-19ba-4fa0-a782-81079a814745)

<br>
<br>

![image](https://github.com/gabrielewanzeler/projeto-php-covid/assets/109773605/4fb1effa-ecdb-4164-bfde-6049e7eb0050)
<br>
<br>
<Strong><h2 align="center"> Ferramentas e Pré-requisitos:</h2></Strong>

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: Git, PHP. Além disto é bom ter um editor para trabalhar com o código como VsCode.

Para o projeto, precisaremos da linguagem PHP.
Para verificar se o PHP está instalado, abra o Prompt de comando da sua máquina e digite:

    php -v

Com isso, é retornada a versão do PHP instalada na máquina. Se ele não estiver instalado, será retornado um erro.

<br>
<br>

<Strong><h2 align="center"> Instalação e acesso ao projeto:</h2></Strong>

Siga estas etapas para configurar e executar o projeto localmente:

<Strong>Clone o repositório:</Strong>

    git clone https://github.com/gabrielewanzeler/projeto-php-covid.git
<br>
<br>
<Strong>Acesse o diretório do projeto no terminal/cmd:</Strong>

    cd projeto-php-covid

Com o projeto aberto no terminal, digitamos php -S, para dizer para o PHP subir um servidor; no localhost, ou seja, na nossa máquina; na porta :8080:

    php -S localhost:8080

Apertamos "Enter". Com isso, é retornado a mensagem de início do servidor com o link para o navegador (http://localhost:8080). Clicamos nele. Isso abrirá o servidor no nosso navegador, exibindo a página inicial do projeto para buscar as informações.


Pronto! Agora você pode utilizar a aplicação localmente no seu próprio computador.
<br>
<br>

<Strong><h2 align="center"> Tecnologias Utilizadas:</h2></Strong>

+ HTML5
+ CSS3
+ JavaScript
+ Backend: PHP
+ Banco de dados: MySQL
<br>
<br>

<Strong><h2 align="center"> Autora:</h2></Strong>

<h3 align="center">Gabriele Rodrigues Wanzeler </h3>
