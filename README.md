# Cap Form

## yarn-audit-fix : appliquer les patches de mise à jour des dépendances

A ce jour, yarn ne dispose pas de l'équivalent de `npm audit fix`.

Le paquet [yarn-audit-fix](https://www.npmjs.com/package/yarn-audit-fix) a été ajouté pour répondre à ce besoin.

Lancez la commande `yarn audit` afin d'identifier les dépendances présentant des failles, puis lancez la commande `yarn yarn-audit-fix` pour faire les mises à jour nécessaires.
