module.exports = {
  roles: (sort) => {
    if (typeof sort === 'object') {
      const sortKey = Object.keys(sort)[0]
      const sortBy = Object.values(sort)[0] || 'ASC'
      return { sortKey, sortBy }
    } else {
      const sortKey = 'id'
      const sortBy = sort || 'ASC'
      return { sortKey, sortBy }
    }
  },
  users: (sort) => {
    if (typeof sort === 'object') {
      const sortKey = Object.keys(sort)[0]
      const sortBy = Object.values(sort)[0] || 'ASC'
      return { sortKey, sortBy }
    } else {
      const sortKey = 'fullName'
      const sortBy = sort || 'ASC'
      return { sortKey, sortBy }
    }
  }
  // email: (sort) => {
  //   if (typeof sort === 'object') {
  //     const sortKey = Object.keys(sort)[0]
  //     const sortBy = Object.values(sort)[0] || 'ASC'
  //     return { sortKey, sortBy }
  //   } else {
  //     const sortKey = 'email'
  //     const sortBy = sort || 'ASC'
  //     return { sortKey, sortBy }
  //   }
  // },
  // transaction: (sort) => {
  //   if (typeof sort === 'object') {
  //     const sortKey = Object.keys(sort)[0]
  //     const sortBy = Object.values(sort)[0] || 'ASC'
  //     return { sortKey, sortBy }
  //   } else {
  //     const sortKey = 'created_at'
  //     const sortBy = sort || 'ASC'
  //     return { sortKey, sortBy }
  //   }
  // }
}
