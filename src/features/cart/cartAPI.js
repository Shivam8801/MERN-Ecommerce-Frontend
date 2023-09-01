export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/cart/' + update.id, {
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
    const response = await fetch('/cart/' + ItemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data: { id: ItemId } })
  }
  );
}



export function resetCart() {
  return new Promise(async (resolve) => {
    const res = await fetchItemsByUserId()
    const items = res.data
    for (let item of items) {
      await deleteItemsFromCart(item.id)
    }
    resolve({ status: "success" })
  })

}
