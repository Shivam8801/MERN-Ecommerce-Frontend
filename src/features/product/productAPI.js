
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchSelectedProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/Products/' + id)
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/Products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}



export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {

  // filter = {"category":["smartphones", "laptops"]}
  // sort = {_sort:"price", _order:"desc"}
  // pagination = {_page=1, _limit=10} // _page=1&_limit=10

  let queryString = ''
  for (let key in filter) {
    const categoryValues = filter[key]

    if (categoryValues.length) {
      for (let subKey of categoryValues) {
        queryString += `${key}=${subKey}&`
      }
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += 'admin=true';
  }


  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products?' + queryString)
    const data = await response.json()
    const totalItems = response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } })
  }
  );
}

