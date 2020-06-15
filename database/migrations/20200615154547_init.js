exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();

    tbl.string("username", 128).notNullable().unique().index();
    tbl.string("password", 256).notNullable();

    tbl
      .integer("role")
      .unsigned()
      .references("roles.id")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {};