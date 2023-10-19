# Project Architecture Functions


1. We have a website with a score board, which shows the top 10 user’s scores.
2. We want live update of the score board.
3. User can do an action ( do not need to care what the action is), completing this action will increase the user’s score.
4. Upon completion the action will dispatch an API call to the application server to update the score.
5. Prevent malicious users from increasing scores without authorisation.

## System 
Nodejs: express, prisma

DB: Mysql

Cache: Redis

Server: Nginx (proxy, load balancing)

## Document

1 Create API with these endpoint 
```
GET: getUserScoreList(limit: number = 10)
POST updateAction(actionId: number)
POST updateUserScore(userId: int, actionId: int)
```
2. getUserScoreList 

```
data in cache ?
   yes: 
     getDataFromCache()
   no:
     getFromDB()
     saveDateToCache()
```

2. updateUserScore
```
checkUserAuthorized()
checkUserIsCompleteAction(actionId: number, userId: number)
updateUserScore(userId: number)
clearCacheData()
```

4. updateAction
```
checkUserAuthorized()
checkActionIsCompleted(actionId: number, actionData: Object)
saveAction(actionData: object)
updateUserScore(userId: number, actionId: number )

```

## Diagram
![plot](./Diagram.png)

## Impovement
1. Use socket to update the realtime data.
2. Convert this system to event driven system 
