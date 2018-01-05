# 数组

```
Promise.resolve(res.data)
    .then( originalList => {
        let newList = [];
        let map = {};
        originalList.forEach(i => {
        if (!map[i.tenantId]) {
          map[i.tenantId] = i;
          newList.push({
            id: i.tenantId,
            name: i.tenantName,
            storeList: [{
              id: i.id,
              name: i.name
            }]
          })
        } else {
          newList.forEach(subI => {
            if (subI.id == i.tenantId) {
              subI.storeList.push({
                id: i.id,
                name: i.name
              })
            }
          })
        }
    })
    return newList;
```