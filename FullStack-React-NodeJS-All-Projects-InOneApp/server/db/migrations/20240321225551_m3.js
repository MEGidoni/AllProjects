/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        table.string('id').primary(); // Create id column as string primary key
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        table.dropPrimary(); // Drop primary key constraint
        table.dropColumn('id'); // Drop id column
        table.increments('id').primary(); // Recreate id column as auto-incrementing primary key
      });
};
