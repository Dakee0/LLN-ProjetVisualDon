# 🎿 Avalanche Insight - Pow Crew

## Léa Macaluso, Loïc Monnerat et Nathan Stader

# 🏔️ Contexte

Le projet exploite deux principales sources de données pour analyser et comprendre les dynamiques des accidents d'avalanche en Suisse et leur corrélation avec la fréquentation des domaines skiables.

La première source de données provient d'envidat.ch, ce jeu de données a été créé par l'Institut WSL pour la recherche sur la neige et les avalanches. Il recense tous les accidents par avalanches de neige connus en Suisse depuis octobre 1970, incluant les incidents impliquant au moins une personne. Ces données sont régulièrement mises à jour après chaque année hydrologique pour inclure de nouvelles informations.
[envidat.ch - Avalanche accidents in Switzerland since 1970/71](https://www.envidat.ch/dataset/avalanche-accidents-in-switzerland-since-1970-71)

La deuxième source de données émane de seilbahnen.org, site des Remontées Mécaniques Suisses (RMS). Ces données ont été compilées par Laurent Vanat, un consultant spécialisé dans l'analyse économique et financière du tourisme de montagne. Ces données, issues du bilan saisonnier 2022/23, sont présentées sous forme de PDF et seront transformées en un jeu de données JSON pour faciliter leur exploitation.
[seilbahnen.org - Bilan saison 2022/2023](https://www.seilbahnen.org/fr/news/bilan-saison-2022-2023)

## 🔧 Description

1. ❄️ **Données sur les avalanches**

   Il contient des informations sur les accidents d'avalanche en Suisse depuis la saison 1970-1971, mises à jour en décembre 2023.
      - **Format** : CSV
      - **Contenu** :
         - Identifiants d'avalanches
         - Dates
         - Coordonnées
         - Informations géographiques (cantons, communes, altitude)
         - Caractéristiques de l'avalanche (inclinaison, aspect de la pente)
         - Niveaux de danger prévus
         - Données démographiques sur les victimes (nombre de décès, capturés, ensevelis)
         - Activité au moment de l'accident

3. ⛷️ **Données sur la fréquentation des domaines skiables**

   Les données sur la fréquentation des skieurs dans les stations suisses, initialement issues du bilan saisonnier 2022/23 en PDF, sont converties en JSON pour améliorer leur accessibilité, manipulation, et intégration dans des analyses et visualisations.
   - **Format** : JSON
   - **Contenu** :
     - Identifiants (int)
     - Saison (date)
     - Nombre de skieurs (real)

## 🎯 But

L'objectif de ce projet est de narrer l'histoire des risques d'avalanche en Suisse à travers une approche de scrollytelling, en combinant une analyse explicative avec des éléments de sensibilisation. En mettant en avant le danger des avalanches et en examinant leur corrélation avec l'affluence des skieurs, le projet vise à informer et à prévenir sur les risques d’avalanches.

## 🔗 Références

Les données que nous exploitons sont utiliser dans aucun projet, cependant voici quelques ressources qui nous ont inspirées.

Références en visualisation de données :
- [My Life with Long COVID - NYTimes](https://www.nytimes.com/interactive/2023/12/14/opinion/my-life-with-long-covid.html?unlocked_article_code=1.F00.435C.ojkN6YhWx43Q)

Inspirations :
- [Design des montagnes par Toppluva](https://www.toppluva.com/GrandMountainAdventure/)
- [Scrollytelling d’une randonnée à travers des images et de la 3D par High Mountains](https://www.highmountains.it/)
