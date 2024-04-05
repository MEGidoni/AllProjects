/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Add the 'is_bought' column as a boolean type with a default value of false
        table.boolean('is_bought').defaultTo(false);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('products', function(table) {
        // Drop the 'is_bought' column if rolling back the migration
        table.dropColumn('is_bought');
      });
};
