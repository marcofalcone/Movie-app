export const getFavorites = (collection) => ({
  schema: {},
  handler: async (req, reply) => {
    const list = await collection.find({}).toArray()
    reply.send(list)
  } 
});

export const addFavorite = (collection) => ({
  schema: {},
  handler: async (req, reply) => {
    const res = await collection.insertOne(req.body)
    if (res) reply.send("movie added")
  } 
});

export const removeFavorite = (collection) => ({
  schema: { id: {type: "number"}},
  handler: async (req, reply) => {
    const res = await collection.deleteOne({ "id": parseInt(req.params.id) })
    if (res) reply.send(res)
  } 
});

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
};
