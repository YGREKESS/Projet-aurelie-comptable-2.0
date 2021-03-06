const templateContactEmail = (infos, url) => {
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
        background-color: #fff;
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
        text-align: center;
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
        text-align: center;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        
      }
      .message-content {
        width: 100%;
        margin: 2rem 0;
      }
      .message-content p,
        .message-content h2 {
          text-align: center;
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
  <html>
	<body style="margin:0;">
		<center style="width: 100%; height: 100vh">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
				<tr>
					<td align="center" height="100%" valign="top" width="100%">
						<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="center" valign="top" style="font-size:0;">
									<div class="email-header" style="display:block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
											<tr>
												<td align="center" valign="center">
	
													<h1 valign="center" style="color:#ffff; white-space:normal;">Demande de contact.</h1>
	
												</td>
											</tr>
										</table>
									</div>

                  <!-- test -->
                  <div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
											<tr>
												<td align="center" valign="top">
                    <div class="message-content">
                              <h2>Qui ?</h2>
                              <p>${infos.lastname} ${infos.firstname}</p>
                            </div>

        
        
												</td>
											</tr>
                      <tr>
                        <td>
                                  <div class="message-content">
          <h2>Email :</h2>
          <p style="color: #fff;">${infos.from}</p>
        </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="message-content">
          <h2>Sujet :</h2>
          <p>${infos.subject}</p>
        </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="message-content">
          <h2>Message :</h2>
          <p>${infos.message}</p>
        </div>
                        </td>
                      </tr>
										</table>
									</div>
									<div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
											<tr>
												<td align="center" valign="top">
	
													<!-- // REPLACE WITH BLOCK -->
    <div class="email-footer">
      <a href="${url}connexion">Inscription/Connexion</a>
      <a href="${url}formulaire-de-contact">Contact</a>
      <a href="${url}mentions-legales">Mentions l??gales</a>
    </div>													<!-- REPLACE WITH BLOCK // -->	
	
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!-- 2-COLUMN SCAFFOLD [CENTERING, FLUID] // -->




			</table>
		</center>
</html>`;
};

const templateDeclaPostedEmail = (infos, pole, url) => {
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
      <h1>Nouvelle d??claration en ligne.</h1>
    </div>
    <div class="email-body">
      <h1>Une nouvelle d??claration vient d'??tre publi??e !</h1>
      <div class="body-container">
        <div>
          <h2>Qui ?</h2>
          <p>${infos.lastname} ${infos.firstname}</p>
        </div>
        <div>
          <h2>P??le ?</h2>
          <p>${pole.name}</p>
        </div>
      </div>
    </div>
    <div class="email-footer">
      <a href="${url}connexion">Inscription/Connexion</a>
      <a href="${url}formulaire-de-contact">Contact</a>
      <a href="${url}mentions-legales">Mentions l??gales</a>
    </div>
  </body>
</html>
`;
};

const templatePasswordForgetEmail = (user, url) => {
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
        background-color: #fff;
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
        text-align: center;
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
        text-align: center;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        
      }
      .message-content {
        width: 100%;
        margin: 2rem 0;
      }
      .message-content p,
        .message-content h2 {
          text-align: center;
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
  <html>
	<body style="margin:0;">
		<center style="width: 100%; height: 100vh">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
				<tr>
					<td align="center" height="100%" valign="top" width="100%">
						<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="center" valign="top" style="font-size:0;">
									<div class="email-header" style="display:block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
											<tr>
												<td align="center" valign="center">
													<h1 valign="center" style="color:#ffff; white-space:normal;">R??initialisation de votre mot de passe.</h1>
												</td>
											</tr>
										</table>
									</div>

                  <!-- test -->
                  <div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
											<tr>
												<td align="center" valign="top">
                          <h1 valign="center" style="margin: 3rem 0; white-space:normal;">Demande de r??initialisation de votre mot de passe.</h1>
                          <div class="body-container">
                              <p>Bonjour ${user.lastname} ${user.firstname}, </br>
                              Vous avez effectu?? une demande de r??initialisation de votre mot de passe.
                          Voici le lien vous permettant d'effectuer cette modification :
                          </br>
                          </br>
                          <a href="${url}update-password/${user._id}">Je modifie mon mot de passe.</a>
                          </br>
                          </br>
                          Si vous n'??tes pas ?? l'origine de cette demande, veuillez ne pas tenir compte de cet email.</br>
                          Cordialement.</p>
                          </div>
                        </td>
                      </tr>
										</table>
									</div>
									<div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
											<tr>
												<td align="center" valign="top">
	
													<!-- // REPLACE WITH BLOCK -->
    <div class="email-footer">
      <a href="${url}connexion">Inscription/Connexion</a>
      <a href="${url}formulaire-de-contact">Contact</a>
      <a href="${url}mentions-legales">Mentions l??gales</a>
    </div>													<!-- REPLACE WITH BLOCK // -->	
	
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!-- 2-COLUMN SCAFFOLD [CENTERING, FLUID] // -->




			</table>
		</center>
</html>`;
};

const templateDemandeDeclaEmail = (user, url) => {
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
        background-color: #fff;
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
        text-align: center;
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
        text-align: center;
      }
      .body-container h2 {
        display: block;
        color: #379ce5;
        font-size: 40px;
        
      }
      .message-content {
        width: 100%;
        margin: 2rem 0;
      }
      .message-content p,
        .message-content h2 {
          text-align: center;
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
  <html>
	<body style="margin:0;">
		<center style="width: 100%; height: 100vh">
			<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
				<tr>
					<td align="center" height="100%" valign="top" width="100%">
						<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td align="center" valign="top" style="font-size:0;">
									<div class="email-header" style="display:block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
											<tr>
												<td align="center" valign="center">
													<h1 valign="center" style="color:#ffff; white-space:normal;">Lien de r??daction de votre d??claration.</h1>
												</td>
											</tr>
										</table>
									</div>

                  <!-- test -->
                  <div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
											<tr>
												<td align="center" valign="top">
                          <h1 valign="center" style="margin: 3rem 0; white-space:normal;">Demande de r??daction de votre d??claration.</h1>
                          <div class="body-container">
          <p>Bonjour ${user.lastname} ${user.firstname},</br>
			Voici le lien avec lequel vous allez pouvoir nous transmettre votre d??claration : 
			</br>
			</br>
			<a href="${url}saisir-ma-declaration/${user._id}">J'effectue ma d??claration.</a>
			</br>
			</br>
			Nous restons ?? votre disposition pour toute demande d'information.
			</br>
			Cordialement.</p>
      </div>
                        </td>
                      </tr>
										</table>
									</div>
									<div style="display:inline-block; max-width:100%; min-width:240px; vertical-align:top; width:100%;">
										<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
											<tr>
												<td align="center" valign="top">
	
													<!-- // REPLACE WITH BLOCK -->
    <div class="email-footer">
      <a href="${url}connexion">Inscription/Connexion</a>
      <a href="${url}formulaire-de-contact">Contact</a>
      <a href="${url}mentions-legales">Mentions l??gales</a>
    </div>													<!-- REPLACE WITH BLOCK // -->	
	
												</td>
											</tr>
										</table>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<!-- 2-COLUMN SCAFFOLD [CENTERING, FLUID] // -->




			</table>
		</center>
</html>
  `;
};

export {
  templateContactEmail,
  templateDeclaPostedEmail,
  templatePasswordForgetEmail,
  templateDemandeDeclaEmail,
};
