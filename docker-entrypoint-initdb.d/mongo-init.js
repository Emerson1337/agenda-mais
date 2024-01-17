print('Start #################################################################');

db = db.getSiblingDB('agendazap');
db.createUser(
  {
    user: 'mongo',
    pwd: 'mongo',
    roles: [{ role: 'readWrite', db: 'agendazap' }],
  },
);
print('End #################################################################');
