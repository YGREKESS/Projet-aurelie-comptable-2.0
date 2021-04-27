const templateContactEmail = (infos) => {
  return `<h1>Demande de contact</h1>
    <p>Qui : ${infos.lastname} ${infos.firstname}, </p>
    <p>Sujet : ${infos.subject}, </p>
    <p>Email : ${infos.from}, </p>
    <p>Message : ${infos.message}. TEMPLATE</p>
  `;
};

const templateDeclaPostedEmail = (infos, pole) => {
  return `<h1>Une nouvelle déclaration vient d'être mise en ligne !</h1>
    <p>Qui : ${infos.lastname} ${infos.firstname}, </p>
	  <p>Pôle : ${pole.name}, </p>
    <p>Email : ${infos.email}, </p>
    <p>${infos.lastname} ${infos.firstname} vient de mettre en ligne une nouvelle déclaration.</p>
  `;
};

const templatePasswordForgetEmail = (user) => {
  return `<h1>Réinitialisation de mot de passe.</h1>
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
	
  `;
};

const templateInfosCompteEmail = (user) => {
  return `<h1>Accés à votre compte.</h1>
    <p>Bonjour ${user.lastname} ${user.firstname}, </p>
	  <p>Voici vos identifiants pour vous connecter à votre compte :
    </br>
    </br>
    Identifiant : ${user.email},</br>
    Mot de passe : "azerty", 
    </br>
    </br>
    <p>Lors de votre 1ère connexion, veuillez sécuriser votre compte en procédant à la personnalisation de votre mot passe.
    </br>
    Cordialement.</p>

  `;
};

const templateDemandeDeclaEmail = (user) => {
  return `<h1>Lien de rédaction de votre déclaration.</h1>
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

  `;
};

export {
  templateContactEmail,
  templateDeclaPostedEmail,
  templatePasswordForgetEmail,
  templateInfosCompteEmail,
  templateDemandeDeclaEmail,
};
