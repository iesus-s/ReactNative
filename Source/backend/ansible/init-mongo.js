// for mongocli
db = db.getSiblingDB("mydatabase");

db.createUser({
  user: "api.svc",
  pwd: "EkG3ebL+l@hCJ,A@KQnG",
  roles: [
    {
      role: "readWrite",
      db: "mydatabase"
    }
  ]
});

db.createCollection("exampleCollection");
