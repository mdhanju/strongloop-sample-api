'use strict';

module.exports = function(User) {
  User.afterRemote('create', function(ctx, user, next) {
    const userrole = ctx.req.body.userrole || 'guest';
    const Role = User.app.models.Role;
    const RoleMapping = User.app.models.RoleMapping;

    const roleFindParams = {
      where: {
        name: userrole // find
      }
    };
    const roleCreateParams = {
      name: userrole // create
    };

    Role.findOrCreate(roleFindParams, roleCreateParams, (err, createdRole, created) => {
      if (err) {
        console.log('Error in getting or creating role :: ', err);
        return next(err);
      }
      createdRole.principals.create(
        {
          principalType: RoleMapping.USER,
          principalId: user.id
        },
        (err, rolePrincipal) => {
          next();
        }
      );
    });
  });
};
