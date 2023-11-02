export default {
  gameDescription: {
    title: "Description d’une manche",
    description:
      "Voici comment se déroule une manche: dans chaque équipe, un orateur doit faire deviner un mot à l’oral à ses coéquipiers. Lorsque l’orateur fait son discours, il y a une liste de mots qui sont piégés. Si l’orateur prononce un de ces mots, la manche de toute l’équipe est perdue. C’est l’équipe adverse qui constitue au préalable la liste des mots piégés et l’orateur n’a pas le droit de voir la liste pendant son discours. Pour marquer un point, il faut réussir sa manche ET les adversaires doivent échouer la leur.",
  },
  trapperCode: {
    title: "Le Code du piégeur",
    articles: [
      {
        title:
          "Les pièges doivent obligatoirement être liés au mot secret ou à la description que l’orateur peut en faire. Il est interdit de piéger des mots qui n’aident en aucune façon à la description du mot secret.",
        description:
          "Ainsi les mots “truc” ou “chose” ne sont pas piégeable car ils n’apportent aucun renseignement sur le mot secret. Piéger le mot “ami” parce qu’on anticipe que l’orateur va parler d’une sortie entre amis pour faire deviner le mot “addition” est correct.",
      },
      {
        title: "Un piège doit être un mot unique qui prend la forme d’un nom, un verbe ou un adjectif.",
        description:
          "Ainsi, il n’est pas permis de piéger des déterminants (un, des, le, son…), les pronoms (je, vous, celle, lui, quelqu’un…) ou les prépositions (à, sur, chez, parmi, dans, avec…) . En cas de doute, une simple recherche sur internet vous aidera à vous rappeler de la nature des mots.",
      },
      {
        title:
          "Les pièges se déclenchent lorsqu’un mot avec la même éthymologie est prononcé par l’orateur. Cette dernière règle peut être invalidée par l’article 4 du Code du piègeur.",
        description:
          "Par exemple le piège “manger” pourra être activé si les mots suivant sont prononcés par l’orateur: “mangeoire”, “mangeont”, “garde-manger”.",
      },
      {
        title:
          "Il est possible de refuser l’activation d’un piège si l’orateur l’a utilisé pour un sens qui n’est pas lié au mot secret. L’application de cette règle se fait selon les situations et les joueurs sont invités à débattre de la validation ou non du piège.",
        description:
          "Exemple avec le mot secret “capitaine” : le mot piège “général” dans la phrase “C’est comme un général” sera valide tandis que dans la phrase “En général, c’est un métier militaire”, les joueurs peuvent décider de refuser le piège si il a été activé.",
      },
      {
        title:
          "Quelque soit la situation, il n’est pas permis de piéger les verbes suivants: être, avoir, aller, faire, pouvoir.",
        description:
          "Il est possible de piéger ces derniers mots lorsqu’ils ne sont pas utilisés comme des verbes. Exemple : “un être vivant”, “le pouvoir royal”, “un fait avéré”… Il faudra alors faire attention à activer le piège que lorsque l’orateur adverse prononce le mot sous sa forme nominale et non pas verbale.",
      },
      {
        title:
          "Durant le discours d’un orateur, un piège s’active dans l’instant où l’orateur a prononcé un mot piégé. ",
        description:
          "Si vous les joueurs ont oublié d’activer un piège, ils peuvent espérer que l’orateur réutilisent le mot piégé durant son discours. Lorsqu’un piège est activé, le chronomètre est arrêté et les hôtes de la partie ont le choix de valider ou refuser le piège. Les joueurs peuvent utiliser ce temps d’arrêt pour débattre des situations.",
      },
      {
        title: "Les pièges ne s’activent pas sur les propositions que font les auditeurs. ",
        description:
          "Aussi, pour que les choses soient justes, les orateurs ne sont pas autorisés à rebondir sur les propositions que font leurs auditeurs. En effet, cela leur permettrait de s’éviter de dire des mots potentiellement risqués. ",
      },
    ],
  },
  guesserCode: {
    title: "Le Code de l’auditeur",
    articles: [
      {
        title:
          "Les auditeurs ne peuvent pas parler ou partager leur opinion sur le mot à deviner pendant le discours de leur orateur.",
        description:
          "Les auditeurs sont autorisés à parler pour se partager le nombre de propositions restantes par exemple. Néanmoins, il faut veiller à déranger le moins possible l’orateur pendant son discours.",
      },
      {
        title:
          "Les auditeurs doivent proposer l’orthographe exacte du mot secret pour réussir leur manche. Le respect des accents ou autres diacritiques n’est pas indispensable.",
        description:
          "Par exemple pour le mot secret “honnêteté”, les propositions “honnête”, “honnêtement” ne seront pas valides. La proposition “honnetete” sera valide.",
      },
    ],
  },
  talkerCode: {
    title: "Le Code de l’orateur",
    introduction: "Les règles concernant les orateurs sont pensées pour garantir que les discours restent piégeables.",
    articles: [
      {
        title: "Ne pas utiliser des mots avec la même étymologie que le mot secret.",
        description:
          "Exemples pour le mot secret parler : parlons, parloir, parlementer, pourparlers sont interdits. Les mots discuter, converser, blablater sont autorisés car ce sont simplement des synonymes.",
      },
      {
        title: "Utiliser uniquement des mots trouvable dans un dictionnaire français. Éviter l’argot.",
        description: "Exemples de mots interdits: player, kill, crush, meuf, relou…",
      },
      {
        title: "Ne pas utiliser les noms propres et tous les mots qui en dérivent.",
        description: "Exemples : France, français, Olympe, olympique, Superman, Pokémon, Himalaya…",
      },
      {
        title: "Ne pas utiliser d’exemples du mot secret.",
        description:
          "Par exemple pour le mot secret fruit: pomme, fraise, cassis et tout autre exemple de fruit est interdit. Mais si le mot secret est banane, les mots pomme, fraise et casssis sont autorisés car ils ne constituent pas des exemples ou des variétés de banane.",
      },
      {
        title: "Ne pas décrire l’orthographe ou la prononciation du mot secret.",
        description:
          "Exemple pour le mot secret opéra: “C’est un anagramme d’apéro !” ; “Ça ressemble au mot opération !” ; “C’est un mot de cinq lettres”",
      },
      {
        title: "Ne pas utiliser des onomatopées, des mélodies, des bruits ou des intonations de voix. ",
        description:
          "Exemples pour le mot secret canard: “Ce qu’on cherche fait coin ! coin !” ; “Souvent on dit qu’il fait un froid de hum… hum…”",
      },
      {
        title:
          "Ne pas utiliser des anecdotes personnelles ou faire référence à l’environnement dans lequel se déroule la partie",
        description:
          "Exemples: “Ma mère est allergique au mot secret”, “Ce qu’on cherche a la même couleur que mon écharpe”, “Ce qu’on cherche se situe dans notre pays”.",
      },
      {
        title: "Toute forme de communication avec les auditeur est interdite.",
        description:
          "Pendant le discours de l’orateur, les propositions des auditeurs doivent uniquement permettre à l’orateur d’adapter ou de réorienter sa description. Une erreur courante est de réagir aux propositions de ses auditeurs ce qui constitue une forme de communication. Dans la mesure du possible il faut essayer de parler avec le ton le plus neutre qui soi. Il est aussi interdit de rebondir sur les propositions que les auditeurs font pour s’éviter de dire des mots risqués.",
      },
    ],
  },
}
