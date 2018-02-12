'use strict';

module.exports = {
  createDefaultRoles: function(app) {
    var users = [];
    var roles = [
      {
        name: 'admin',
        description: 'Admin'
      },
      {
        name: 'owner',
        description: 'Owner'
      },
      {
        name: 'guest',
        description: 'Guest user'
      }
    ];

    roles.forEach(function(role) {
      var params = {
        where: {
          name: role.name
        }
      };
      var params2 = {
        name: role.name,
        description: role.description
      };
      app.models.Role.findOrCreate(params, params2, function(err, createdRole, created) {
        if (err) {
          console.error('error running findOrCreate(' + role.name + ')', err);
        }
        console.log('createdRole :: ', createdRole);
        users.push(createdRole);
      });
    });
    return users;
  }
};
