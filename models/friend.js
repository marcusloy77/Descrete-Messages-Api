const db = require("../db/db")

const Friend = {
  createList: (id) => {
    const sql = `
    CREATE TABLE friend_list_${id}(
      id SERIAL PRIMARY KEY,
      user_name TEXT,
      relationship TEXT
    )
    `
    return db
      .query(sql)
  },

  getFriendsList: (id) => {
    const sql = `
    SELECT * FROM friend_list_${id}
    `
    return db
      .query(sql)
  },

  getFriendsListByUsername: (userName) => {

  },

  sendRequest: (id, userName, friendId, friendUserName) => {
    const sql = `
    INSERT INTO friend_list_${id}(user_name, relationship) VALUES($1, 'pending')`
    const sql2 = `
    INSERT INTO friend_list_${friendId}(user_name, relationship) VALUES($1, 'request')
    `
    db.query(sql, [friendUserName])
    return db.query(sql2, [userName])
  },

  acceptRequest: (id, userName, friendId, friendUserName) => {
    const sql = `
    UPDATE friend_list_${id} SET relationship = 'friend' WHERE user_name = $1
    UPDATE friend_list_${friendId} SET relationship = 'friend' WHERE user_name = $2
    `
    return db
      .query(sql, [friendUserName, userName])
  },

  denyRequest: (id, userName, friendId, friendUserName) => {
    const sql = `
    DELETE FROM friend_list_${id} WHERE user_name = $1
    DELETE FROM friend_list_${friendId} WHERE user_name = $2
    `
    return db
      .query(sql, [friendUserName, userName])
  }
  
}

module.exports = Friend