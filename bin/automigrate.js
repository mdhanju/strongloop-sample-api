const path = require('path');

const app = require(path.resolve(__dirname, '../server/server'));
const ds = app.datasources.mdb;
const tabels = [
        'AccessToken',
        // 'ACL',
        // 'RoleMapping',
        // 'Role',
        // 'user',
        // 'funding',
        // 'address',
        // 'activity'
   ];

for (var i in tabels) {
  console.log('Updating table :: ', tabels[i]);

  // ds.automigrate(tabels[i], function(err) {
  ds.autoupdate(tabels[i], function(err) {
    if (err) throw err;
    // ds.disconnect();
  });
}
ds.disconnect();
