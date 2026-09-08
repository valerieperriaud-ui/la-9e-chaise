/*
  Tous les textes visibles, les liens et les références d’image sont ici.
  Chaque portrait peut être remplacé indépendamment dans le dossier assets.
*/
window.content = {
  intro: {
    appName: "La 9e chaise",
    title: "Elles sont huit autour du cercle.",
    text: "Il reste une chaise vide.\nPendant quelques minutes, elle est à vous.",
    button: "Prendre place",
    privacy: "Ce que vous choisissez ou écrivez ici n’est pas enregistré."
  },

  characters: {
    maddy: { name: "Maddy", image: "assets/maddy.webp" },
    joceline: { name: "Joceline", image: "assets/joceline.webp" },
    camila: { name: "Camila", image: "assets/camila.webp" },
    elsa: { name: "Elsa", image: "assets/elsa.webp" },
    pascale: { name: "Pascale", image: "assets/pascale.webp" },
    samia: { name: "Samia", image: "assets/samia.webp" },
    romy: { name: "Romy", image: "assets/romy.webp" },
    marion: { name: "Marion", image: "assets/marion.webp" }
  },

  steps: [
    {
      speaker: "maddy",
      line: "Un après-midi, je me suis demandé ce que j’allais faire jusqu’au soir. Enfin… pas seulement ce jour-là. Tous les jours.",
      question: "Quand une journée ne dépend plus des besoins des autres, qu’est-ce qui arrive d’abord pour toi ?",
      answers: [
        { text: "Un vide. Je ne sais plus très bien quoi en faire.", reaction: { speaker: "camila", text: "Le vide, je connais. Chez moi, il ressemble d’abord à une liste de choses à faire pour quelqu’un d’autre." } },
        { text: "Du soulagement… puis presque aussitôt de la culpabilité.", reaction: { speaker: "camila", text: "Oui. J’ai déjà pensé que je pourrais m’habituer à ne plus être indispensable. Cette pensée m’a fait peur." } },
        { text: "J’ai des envies, mais elles passent toujours après le reste.", reaction: { speaker: "elsa", text: "Alors elles sont là. Elles ont seulement appris à attendre leur tour." } }
      ],
      custom: {
        label: "Tu peux laisser ici quelques mots. Ils ne quitteront pas cette page sans ton accord.",
        placeholder: "Ce qui me vient…",
        reaction: { speaker: "maddy", text: "Je ne sais pas encore quoi répondre non plus. Ne pas savoir m’a déjà fait du bien." }
      }
    },
    {
      speaker: "joceline",
      line: "J’aimerais parfois qu’on me réclame comme avant, même si cela voulait dire redevenir celle qui absorbait tout.",
      question: "Quand on ne te réclame plus, qu’est-ce que cela change pour toi ?",
      answers: [
        { text: "Je respire enfin, même si le silence me déroute.", reaction: { speaker: "elsa", text: "La liberté peut être étrange quand personne ne vient plus la déranger." } },
        { text: "J’ai peur de ne plus compter autant.", reaction: { speaker: "maddy", text: "Savoir qu’on pense encore à moi me rassure. Voir les autres vivre sans moi me déstabilise." } },
        { text: "Je cherche aussitôt une nouvelle façon de me rendre utile.", reaction: { speaker: "camila", text: "Moi aussi. Je peux payer quelqu’un pour m’aider et continuer à vérifier qu’elle n’a pas besoin de moi." } }
      ],
      custom: {
        label: "Tu peux répondre autrement, avec tes mots.",
        placeholder: "Quand on ne me réclame plus…",
        reaction: { speaker: "joceline", text: "Je ne sais pas toujours distinguer le soulagement de la peur de ne plus être indispensable." }
      }
    },
    {
      speaker: "camila",
      line: "On m’a demandé ce que j’avais prévu pour moi. J’ai répondu tout ce que j’avais à faire. Ce n’était pas la question.",
      question: "Et toi, où en es-tu avec ce dont tu as envie ?",
      answers: [
        { text: "Je le sais. Mais je ne me l’autorise pas encore.", reaction: { speaker: "elsa", text: "J’ai longtemps cru que refuser suffisait à être libre. Demander une autre place, c’est différent." } },
        { text: "Je ne sais plus. Mes journées sont pleines, pourtant.", reaction: { speaker: "maddy", text: "Moi aussi, j’avais plein d’idées. Mais beaucoup dépendaient encore de ce que les autres feraient." } },
        { text: "Je recommence à essayer de petites choses, sans être sûre.", reaction: { speaker: "romy", text: "On peut peut-être choisir un petit morceau de la suite sans savoir quoi faire de tout le reste." } }
      ],
      custom: {
        label: "Tu peux répondre avec tes mots.",
        placeholder: "En ce moment, j’ai envie de…",
        reaction: { speaker: "camila", text: "Je crois qu’une envie peut commencer comme ça : quelques mots qu’on accepte enfin d’entendre." }
      }
    },
    {
      speaker: "elsa",
      line: "J’ai construit une vie dans laquelle je pouvais partir quand je voulais, mais où personne ne remarquerait forcément mon absence.",
      question: "Dans ta vie aujourd’hui, qu’aimerais-tu préserver sans t’y enfermer ?",
      answers: [
        { text: "Ma liberté de décider pour moi.", reaction: { speaker: "samia", text: "J’ai fait l’inverse. J’ai construit ma vie autour du lien. Aujourd’hui, je cherche ce qui peut rester sans m’engloutir." } },
        { text: "Les liens qui comptent, sans qu’ils prennent toute la place.", reaction: { speaker: "camila", text: "Aimer quelqu’un sans être nécessaire à chaque instant… j’apprends encore ce que cela pourrait vouloir dire." } },
        { text: "Je ne sais pas encore où placer la limite.", reaction: { speaker: "pascale", text: "Les limites implicites me rendent folle. Pourtant, les miennes ne sont pas toujours plus claires." } }
      ],
      custom: {
        label: "Tu peux nommer ce que tu voudrais préserver.",
        placeholder: "Je voudrais garder…",
        reaction: { speaker: "elsa", text: "Avoir une place dans la vie de quelqu’un sans devoir renoncer à la mienne… c’est peut-être ce que je cherche." }
      }
    },
    {
      speaker: "pascale",
      line: "J’ai appris à regarder le visage des gens pendant que je parle et à prévoir une raison de partir avant qu’on ait envie que je parte.",
      question: "Quand tu arrives parmi les autres, qu’est-ce qui t’aide à prendre ta place ?",
      answers: [
        { text: "Observer d’abord, pour comprendre comment cela fonctionne.", reaction: { speaker: "elsa", text: "J’ai plutôt fait comme si les règles ne me concernaient pas. C’était une autre façon de m’en protéger." } },
        { text: "Dire qui je suis, même si je ne sais pas comment ce sera reçu.", reaction: { speaker: "maddy", text: "Je passe souvent beaucoup de temps à expliquer ce que j’ai fait, comme si cela devait prouver qui je suis." } },
        { text: "Attendre qu’on me montre clairement que je suis bienvenue.", reaction: { speaker: "romy", text: "Parfois, les invitations comptent même quand on ne sait pas encore y répondre." } }
      ],
      custom: {
        label: "Tu peux décrire ta manière d’entrer dans un groupe.",
        placeholder: "Avec les autres, j’ai tendance à…",
        reaction: { speaker: "pascale", text: "J’aimerais pouvoir rencontrer les autres avant de décider ce qu’elles vont penser de moi." }
      }
    },
    {
      speaker: "samia",
      line: "J’ai construit ma vie autour du lien : le couple, la famille, la fidélité. J’ai pris tout cela très au sérieux.",
      question: "Quand un lien important change, qu’est-ce que tu essaies de préserver d’abord ?",
      answers: [
        { text: "L’histoire vécue ensemble, même si la suite devient incertaine.", reaction: { speaker: "romy", text: "Garder une trace n’oblige peut-être pas à garder toute la maison autour." } },
        { text: "La part de moi que j’ai trop longtemps mise de côté.", reaction: { speaker: "elsa", text: "Choisir sa place ne signifie pas forcément effacer tous les liens qui l’entourent." } },
        { text: "Rien pour l’instant. J’ai besoin de ne pas décider trop vite.", reaction: { speaker: "marion", text: "Ne pas transformer tout de suite ce qu’on vit en décision peut aussi laisser un peu d’air." } }
      ],
      custom: {
        label: "Tu peux écrire ce que tu essaies de préserver.",
        placeholder: "Dans ce lien, je voudrais garder…",
        reaction: { speaker: "samia", text: "Je découvre que préserver un lien et me préserver ne sont pas toujours la même décision." }
      }
    },
    {
      speaker: "romy",
      line: "Après la mort de mon père, tout le monde m’a dit : “Maintenant, il faut penser à toi.” Les gens vous annoncent la suite comme si elle était évidente.",
      question: "Y a-t-il quelque chose que tu continues à garder, même si tu ne sais plus ce que tu veux en faire ?",
      answers: [
        { text: "Un objet ou un lieu qui retient une part de mon histoire.", reaction: { speaker: "marion", text: "Certaines choses nous rendent reconnaissables à nous-mêmes, même quand elles sont devenues lourdes." } },
        { text: "Une habitude qui me rassure, même si elle m’empêche d’avancer.", reaction: { speaker: "camila", text: "Ce qui nous a aidées à tenir peut finir par nous retenir. Je le vois aussi chez moi." } },
        { text: "Non. C’est plutôt ce que j’ai laissé partir qui me revient.", reaction: { speaker: "samia", text: "Ce qui n’est plus là peut encore occuper beaucoup de place." } }
      ],
      custom: {
        label: "Tu peux déposer ici ce que tu gardes encore.",
        placeholder: "Je garde encore…",
        reaction: { speaker: "romy", text: "Je ne sais pas toujours si je garde ces choses par fidélité, par peur ou simplement parce que je ne suis pas prête." }
      }
    },
    {
      speaker: "marion",
      line: "Quand on me dit de reprendre ma vie, je ne sais plus très bien de quelle vie on parle.",
      question: "Y a-t-il quelque chose de ta vie d’avant que tu ne voudrais plus reprendre à l’identique ?",
      answers: [
        { text: "Oui. La place où tout le monde me trouvait toujours disponible.", reaction: { speaker: "elsa", text: "Avoir une place dans la vie de quelqu’un sans renoncer à la sienne… peut-être que c’est par là." } },
        { text: "Oui. Le rythme qui ne me laissait jamais me demander comment j’allais.", reaction: { speaker: "maddy", text: "Pouvoir reprendre ne signifie peut-être pas devoir tout reprendre." } },
        { text: "Je ne sais pas encore. J’aimerais laisser la question ouverte.", reaction: { speaker: "marion", text: "Je n’ai pas la réponse non plus. Je veux seulement garder cette question avec moi." } }
      ],
      custom: {
        label: "Écris seulement ce qui a besoin d’être posé maintenant.",
        placeholder: "Je ne voudrais plus…",
        reaction: { speaker: "marion", text: "Merci. Ici, tu peux être une femme parmi d’autres, sans avoir à rendre ton histoire exemplaire." }
      }
    }
  ],

  controls: {
    customAnswer: "Écrire autre chose",
    customSubmit: "Déposer ces mots",
    customCancel: "Revenir aux réponses",
    back: "Revenir en arrière",
    feedbackBack: "Revoir la dernière question",
    review: "Revoir les questions",
    continue: "Laisser la parole circuler",
    finish: "Écouter Valérie"
  },

  feedback: {
    eyebrow: "Une dernière voix",
    name: "Valérie",
    question: "Qu’as-tu pensé de cette expérience ?",
    label: "Ta réponse est libre. Aucun nom ne t’est demandé.",
    placeholder: "Ce que j’ai ressenti, aimé ou moins aimé…",
    send: "Envoyer mes réponses à Valérie",
    skip: "Continuer sans envoyer",
    privacy: "Si tu choisis l’envoi, ta messagerie s’ouvrira avec tes réponses déjà préparées. Ton adresse d’expédition pourra être visible par Valérie, mais rien ne sera envoyé avant ta confirmation.",
    subject: "Retour sur l’expérience La 9e chaise",
    email: "metadeclic@gmail.com"
  },

  final: {
    eyebrow: "Le cercle se referme doucement",
    title: "Vous venez de passer quelques minutes dans leur cercle.",
    text: "Et vous avez laissé votre parole prendre sa place. Que décidez-vous pour la suite ?",
    actions: [
      { label: "Continuer leur histoire", link: "amazon", style: "primary" },
      { label: "Prendre réellement la 9ème chaise", link: "circle", style: "secondary" },
      { label: "Je préfère parler seule avec Valérie", link: "session", style: "tertiary" }
    ]
  },

  links: {
    public: "https://valerieperriaud-ui.github.io/la-9e-chaise/",
    amazon: "https://www.amazon.fr/Moi-apr%C3%A8s-autres-sadapter-comment/dp/B0HG614Q2G/ref=tmm_pap_swatch_0",
    circle: "https://valerie-perriaud.systeme.io/resaetpaiementducercle",
    session: "mailto:metadeclic@gmail.com"
  },

  share: {
    title: "Sinon, à qui laisseriez-vous la place ?",
    text: "Je viens de prendre place quelques minutes dans le cercle de La 9e chaise.",
    native: "Partager",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    tiktok: "TikTok",
    instagram: "Instagram",
    copy: "Copier le lien",
    copied: "Le lien est copié.",
    copiedForNetwork: "Le lien est copié — vous pouvez maintenant le coller dans {network}.",
    copyFailed: "Impossible de copier automatiquement le lien.",
    missingLink: "Cette adresse est à renseigner dans content.js."
  }
};
