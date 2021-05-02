const templateContactEmail = (infos) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      body {
        margin: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        min-height: 100vh;
        font-family: "Roboto", sans-serif;
        background-color: #ffff;
      }
      .email-header {
        height: 10rem;
        background-color: #379ce5;
        width: 100%;
        color: #ffff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .email-header h1 {
        font-weight: 400;
        width: 100%;
        text-align: left;
        padding: 0 5rem;
      }
      .email-body {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: auto;
      }
      .email-body h1 {
        font-weight: 400;
        width: 100%;
        text-align: center;
        padding: 0 5rem;
        margin-bottom: 4rem;
      }
      .body-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-bottom: 4rem;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        text-align: left;
      }
      .message-content {
        width: 100%;
      }
      .email-footer {
        margin-top: auto;
        height: 10rem;
        background-color: #18212d;
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }
      .email-footer a {
        margin-bottom: 1rem;
        text-decoration: none;
        color: #ffff;
        font-weight: 200;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-header">
      <h1>Demande de contact.</h1>
    </div>
    <div class="email-body">
      <h1>Un utilisateur souhaite vous contacter.</h1>
      <div class="body-container">
        <div class="message-content">
          <h2>Qui ?</h2>
          <p>${infos.lastname} ${infos.firstname}</p>
        </div>
        <div class="message-content">
          <h2>Email :</h2>
          <p>${infos.from}</p>
        </div>
        <div class="message-content">
          <h2>Sujet :</h2>
          <p>${infos.subject}</p>
        </div>
        <div class="message-content">
          <h2>Message :</h2>
          <p>${infos.message}</p>
        </div>
      </div>
    </div>
    <div class="email-footer">
      <a href="/connexion">Inscription/Connexion</a>
      <a href="/formulaire-de-contact">Contact</a>
      <a href="/mentions-legales">Mentions légales</a>
    </div>
  </body>
</html>

  `;
};

const templateDeclaPostedEmail = (infos, pole) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      body {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        font-family: "Roboto", sans-serif;
        background-color: #ffff;
      }
      .email-header {
        height: 10rem;
        background-color: #379ce5;
        width: 100%;
        color: #ffff;
        display: flex;
        align-items: center;
      }
      .email-header h1 {
        font-weight: 400;
        width: 100%;
        text-align: left;
        padding: 0 5rem;
      }
      .email-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
      .email-body h1 {
        font-weight: 400;
        width: 100%;
        text-align: center;
        padding: 0 5rem;
        margin-bottom: 4rem;
      }
      .body-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin-bottom: 4rem;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        text-align: left;
      }
      .email-footer {
        margin-top: auto;
        height: 10rem;
        background-color: #18212d;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .email-footer a {
        margin-bottom: 1rem;
        text-decoration: none;
        color: #ffff;
        font-weight: 200;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-header">
      <h1>Nouvelle déclaration en ligne.</h1>
    </div>
    <div class="email-body">
      <h1>Une nouvelle déclaration vient d'être publiée !</h1>
      <div class="body-container">
        <div>
          <h2>Qui ?</h2>
          <p>${infos.lastname} ${infos.firstname}</p>
        </div>
        <div>
          <h2>Pôle ?</h2>
          <p>${pole.name}</p>
        </div>
      </div>
    </div>
    <div class="email-footer">
      <a href="/connexion">Inscription/Connexion</a>
      <a href="/formulaire-de-contact">Contact</a>
      <a href="/mentions-legales">Mentions légales</a>
    </div>
  </body>
</html>
`;
};

const templatePasswordForgetEmail = (user) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      body {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        font-family: "Roboto", sans-serif;
        background-color: #ffff;
      }
      .email-header {
        height: 10rem;
        background-color: #379ce5;
        width: 100%;
        color: #ffff;
        display: flex;
        align-items: center;
      }
      .email-header h1 {
        font-weight: 400;
        width: 100%;
        text-align: left;
        padding: 0 5rem;
      }
      .email-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
      .email-body h1 {
        font-weight: 400;
        width: 100%;
        text-align: center;
        padding: 0 5rem;
        margin-bottom: 4rem;
      }
      .body-container {
        width: 80%;
		text-align: center;
    margin-bottom: 4rem;
      }
	  .body-container a{
        display: block;
        color: #ffff;
		height: 3rem;
		width: fit-content;
		background-color: #18212d;
		margin: auto;
		text-decoration: none;
		line-height: 3rem;
		padding: .5rem;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        text-align: left;
      }
      .email-footer {
        margin-top: auto;
        height: 10rem;
        background-color: #18212d;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .email-footer a {
        margin-bottom: 1rem;
        text-decoration: none;
        color: #ffff;
        font-weight: 200;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-header">
      <h1>Réinitialisation de mot de passe.</h1>
    </div>
    <div class="email-body">
      <h1>Demande de réinitialisation de votre mot de passe.</h1>
      <div class="body-container">
          <p>Bonjour ${user.lastname} ${user.firstname}, </p>
          <p>Vous avez effectué une demande de réinitialisation de votre mot de passe.
			Voici le lien vous permettant d'effectuer cette modification :
			</br>
			</br>
			<a href="https://site-compta-aurelie.herokuapp.com/#/update-password/${user._id}">Je modifie mon mot de passe.</a>
			</br>
			</br>
			Si vous n'êtes pas à l'origine de cette demande, veuillez ne pas tenir compte de cet email.</br>
			Cordialement.</p>
      </div>
    </div>
    <div class="email-footer">
      <a href="/connexion">Inscription/Connexion</a>
      <a href="/formulaire-de-contact">Contact</a>
      <a href="/mentions-legales">Mentions légales</a>
    </div>
  </body>
</html>
  `;
};

const templateDemandeDeclaEmail = (user) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      body {
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        font-family: "Roboto", sans-serif;
        background-color: #ffff;
      }
      .email-header {
        height: 10rem;
        background-color: #379ce5;
        width: 100%;
        color: #ffff;
        display: flex;
        align-items: center;
      }
      .email-header h1 {
        font-weight: 400;
        width: 100%;
        text-align: left;
        padding: 0 5rem;
      }
      .email-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
      .email-body h1 {
        font-weight: 400;
        width: 100%;
        text-align: center;
        padding: 0 5rem;
        margin-bottom: 4rem;
      }
      .body-container {
        width: 80%;
		text-align: center;
    margin-bottom: 4rem;
      }
	  .body-container a{
        display: block;
        color: #ffff;
		height: 3rem;
		width: fit-content;
		background-color: #18212d;
		margin: auto;
		text-decoration: none;
		line-height: 3rem;
		padding: .5rem;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        text-align: left;
      }
      .email-footer {
        margin-top: auto;
        height: 10rem;
        background-color: #18212d;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .email-footer a {
        margin-bottom: 1rem;
        text-decoration: none;
        color: #ffff;
        font-weight: 200;
      }
      .email-footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-header">
      <h1>Lien de rédaction de votre déclaration.</h1>
    </div>
    <div class="email-body">
      <h1>Demande de rédaction de votre déclaration.</h1>
      <div class="body-container">
          <p>Bonjour ${user.lastname} ${user.firstname}, </p>
			<p>Voici le lien avec lequel vous allez pouvoir nous transmettre votre déclaration : 
			</br>
			</br>
			<a href="https://site-compta-aurelie.herokuapp.com/#/saisir-ma-declaration/${user._id}">J'effectue ma déclaration.</a>
			</br>
			</br>
			Nous restons à votre disposition pour toute demande d'information.
			</br>
			Cordialement.</p>
      </div>
    </div>
    <div class="email-footer">
      <a href="/connexion">Inscription/Connexion</a>
      <a href="/formulaire-de-contact">Contact</a>
      <a href="/mentions-legales">Mentions légales</a>
    </div>
  </body>
</html>
  `;
};

export {
  templateContactEmail,
  templateDeclaPostedEmail,
  templatePasswordForgetEmail,
  templateDemandeDeclaEmail,
};
