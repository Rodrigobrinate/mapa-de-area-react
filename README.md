# como rodar esse projet

## Windows
1. vistie [esse link](https://docs.microsoft.com/pt-br/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package) para poder realizar o dowload do wls2 nescessário para instalar o dokcer
2. realize a instalação do [docker](https://docs.docker.com/desktop/windows/install/)
3. instale o [git](https://git-scm.com/downloads)
4. abra o terminal vá até a pasta que deseja inserir o projeto e digite
   ```git clone https://github.com/Rodrigobrinate/mapa-de-area-react ```
   <br />
   4.1 em seguida
   ``` git clone https://github.com/Rodrigobrinate/mapa-de-area ```
   <br />
   4.2 em seguida 
    ```$ cd mapa-de-area```
    <br />
   4.3 agora vamos digitar o comando para subir o projeto
      ```$ docker-compose up```
 5. em seguida como nosso projeto foi construido com o ORM prisma devemos utiliza-lo para criar o banco de dado
 
   ```$ dokcer ps```
 
   ```$ docker exec -it "id do container" /bin/bash```
 
   ```$ cd mapa-de-area```
   
   ```$ npx prisma db push```
   
   tudo pronto!! o sistema já está rodando o banco de dados na porta 3306 o node na porta 6868 e o react na porta 3001


