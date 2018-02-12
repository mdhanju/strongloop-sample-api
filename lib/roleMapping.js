'use strict';

module.exports = {
  createRolesMapping: function(app, role, cb) {
    var param = {
      where: {
        name: role.name
      }
    };
    var param2 = {
      name: role.name
    };
    app.models.Role.findOrCreate(param, param2, function(err, createdRole, created) {
      if (err) {
        return cb(err, null);
      } else {
        createdRole.principals.create(
          {
            principalType: app.models.RoleMapping.USER,
            principalId: 26
          },
          function(err, rolePrincipal) {
            cb(null, createdRole);
          }
        );
      }
    });
  }
};
