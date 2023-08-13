export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchItemsByUserId(UserId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart?user=' + UserId)
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function deleteItemsFromCart(ItemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + ItemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data:{id:ItemId} })
  }
  );
}


