export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

// establish connection to db
// storeName is passed into the object store
export const idbPromise = (storeName, method, object) => {
  // wrap in promise, making it easier to work with IDB's async nature
  return new Promise((resolve, reject) => {
    // open connection to database with version 1
    const request = window.indexedDB.open('shop-shop', 1);

    // create variables to hold database, transaction and store
    let db, tx, store;
    
    // if version changed or if this is the first time using it, else will not run
    request.onupgradeneeded = function(e) {
      const db = request.result;
      // create three object stores and set 'primary' key to _id
      db.createObjectStore('products', { keyPath: '_id' });
      db.createObjectStore('categories', { keyPath: '_id' });
      db.createObjectStore('cart', { keyPath: '_id' });
    };

    // handle any errors with connecting
    request.onerror = function(e) {
      console.log('There was an error');
    };

    // on db open success
    request.onsuccess = function(e) {
      // save a reference of the database to the db variable
      db = request.result;
      // open a transaction to whatever we pass into the storeName,
      // must match one of the object store names
      tx = db.transaction(storeName, 'readwrite')
      // save a reference to that object store under 'store' 
      store = tx.objectStore(storeName);

      // if error let us know
      db.onerror = function(e) {
        console.log('error', e);
      };

      // check which method is passed through to the object
      switch (method) {
        // both put and get return data to the idbPromise()
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
          // if delete we only delete from the store
        case 'delete':
          store.delete(object._id);
          break;
        default: 
        console.log('No valid method');
        break;
      }

      // when transaction complete, close the connection
      tx.oncomplete = function() {
        db.close();
      }
    }

  });

}