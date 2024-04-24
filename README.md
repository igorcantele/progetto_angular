# Challenge

1. [Schema](#schema)
2. [Sorgenti](#sorgenti)
3. [Endpoint](#endpoint)
4. [Docker](#docker)
5. [Angular](#angular)

Usando Spring Boot (versione 2.x), si chiede di creare un servizio HTTP Rest che esponga le news raccolte da 3 diverse
sorgenti dati:

- Hacker;
- NyTimes;
- Bbc.

## Schema

Si vuole avere un json d'uscita che rispetti il seguente schema:

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
    "publishDate": {
      "type": "string",
      "format": "date-time"
    },
    "type": {
      "type": "string",
      "enum": [
				"Hacker",
				"NyTimes",
				"Bbc"
			]
    },
    "source": {
      "type": "string"
    }
  },
  "required": [
    "title",
    "url",
    "publishDate",
    "type",
    "source"
  ]
}
```

Esempio:

```
{
  "title": "For Car Thieves, Toronto Is a 'Candy Store,' and Drivers Are Fed Up",
  "url": "https://www.nytimes.com/2024/02/24/world/canada/toronto-car-theft-epidemic.html",
  "publishDate": "2024-02-24",
  "type": "Article",
  "source": "NyTimes"
}
```

## Sorgenti

Le sorgenti dati sono:

**NyTimes**

```
https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=P9eZP8Gn1gllxx3q5QDlsJwsmQ1yQgAN 
```

**Hacker**
Indice news

```
https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
```

Dettaglio

```
https://hacker-news.firebaseio.com/v0/item/[id_news].json?print=pretty
```

**BBC**

```
http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9acc642023684f07b46fae89185513ce
```

## Endpoint

Si chiede di implementare i seguenti endpoint

Elenco di tutte le news (10 per sorgente)

```
GET http://localhost:8080/news
```

Elenco delle news per la sorgente dati (max 30 elementi)

```
GET http://localhost:8080/news/{source}
```

Le sorgenti disponibili sono:

    Hacker;
    NyTimes;
    Bbc.

```
POST http://localhost:8080/save
```

Persiste le news in MongoDb.

```
GET http://localhost:8080/list
```

Legge le news da MongoDb

```
GET http://localhost:8080/list/{word} (max 10 elementi)
```

Legge le news da MongoDb filtrate per parola nel titolo/testo.

## Docker

Inserirlo in un container Docker insieme a MongoDb e pubblicarlo su un repository condiviso

## Angular

Creare un'app di Front End in Angular per visualizzare i contenuti e filtrare i dati basandosi sul servizio appena
sviluppato e pubblicarlo su un repository condiviso
