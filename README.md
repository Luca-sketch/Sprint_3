#**Titulo: API CEP**

##**Descrição**
Essa API e parte do projeto Modern Click Store mas pode ser utilizada em outros projetos. Essa API é responsável pela validação do CEP e a busca do CEP por meio da geolocalização(Latitude e longitude).
Tanto a Validação do CEP como a busca da geolocalização faz uso de outras API externas, sendo elas [viacep](https://viacep.com.br/) para validação e a [nominatim](https://nominatim.org/) para obter o CEP.

##**Fluxograma**
Esse projeto corresponde as seções API (NODE JS) com a comunição da __API VIACEP__ e __API NOMINATIM__
![API VIA CEP](https://drive.google.com/file/d/1NBjGPxtzwaBeNNsRebCLOGiGg8gidkVO/view?usp=sharing)

##**Instrução**
Essa API pode funcionar por dois métodos: Container e pela método tradicional de instalação das dependencias:

###**1. Docker**
 -docker build -t api_cep .
 -docker run -d -p 4000:4000 api_cep

###**2. Instalação Tradicional**
 -node index.js
 -npm start
