# Indica imagem e versão está sendo usada
FROM node:alpine

# Executa um comando no temrinal, ex criou pasta
RUN mkdir /usr/app

# Fala que todos os comandos serão executados nessa pasta
WORKDIR /usr/app

# Copia esses arquivos para a iamgem que está sendo criada
COPY package.json yarn.lock ./

# Executa o comando yarn na imagem
RUN yarn

# Copia toda a aplicação, ignorando os arquivos no dockerignore
COPY . ./

# Indica qual porta a imagem receberá requisições
EXPOSE 3000

# Comando para executar aplicação que no caso é nodejs
CMD [ "yarn" , "start" ]